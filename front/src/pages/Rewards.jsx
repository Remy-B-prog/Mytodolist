import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import Title from '../component/Title';
import Badge from '../component/Badge';

export default function Reward() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [badgeList, setBadgeList] = useState([]);
  const [badgeNotValidated, setBadgeNotValidated] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userScore, setUserScore] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get('/api/badge/')
      .then((res) => {
        setBadgeList(res.data);
        axios
          .get('/api/badge/no-validated').then((badge) => {
            setBadgeNotValidated(badge.data);
            axios
              .get('/api/score/')
              .then((score) => {
                setUserScore(score.data);
                setIsLoading(false);
              })
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
console.log(userScore);
  const isMobile = windowWidth <= 1024;

  return (
    <>
      <div className="flex flex-col h-screen max-h-[100rem] w-full">
        <Title title={"Récompense"} />
        <div className="flex flex-col min-h-screen w-full">
          {isMobile ? (
            <>
              <main className="flex-grow w-full pb-28">
                <h2 className='text-center mb-6 mt-6'>Obtenu</h2>
                <div className='flex justify-center w-screen flex flex-wrap gap-5 ps-4 pe-4'>
                  {isLoading ?
                    <div>chargement...</div> :
                    badgeList.map((e) => (
                      <div>
                        <Badge color={e.color} title={e.title} />
                      </div>
                    )
                    )
                  }
                </div>
                <h2 className='text-center mt-6 mb-6'>Prochaine recompenses</h2>
                <div className='flex justify-center w-screen flex flex-wrap gap-5 ps-4 pe-4'>
                  {isLoading ?
                    <div>chargement...</div> :
                    badgeNotValidated.map((e) => (
                      <>
                        <div >
                          <h2 className='text-md text-center'>{`  ${e.category === "Taches ménagère" ? userScore[0].score : userScore[1].score} / ${e.critical_score}`}</h2>
                          <div>
                            <Badge color={e.color} title={e.title} />
                          </div>
                        </div>

                      </>

                    )
                    )
                  }
                </div>
              </main>
              <Navbar linkLeft={"/tableau-de-bord"} logoLeft={"/image/login.svg"} linkRight={"/taches"} logoRight={"/image/notebook.svg"} />
            </>

          ) : (
            <>
              <Navbar />
              <main className="flex-grow overflow-y-auto w-full">
                {/* Votre contenu principal ici */}
              </main>
            </>
          )}
        </div>
      </div>
    </>
  );
}
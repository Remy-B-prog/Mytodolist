import React, { useState, useEffect} from 'react';
import Navbar from '../component/Navbar';
import Title from '../component/Title';

export default function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 1024;

  return (
    <>
      <div className="flex flex-col h-screen max-h-[100rem] w-full">
        {isMobile ? (
          <>
              <div className='mt-5'></div>
            <Title title={"Taches"} />
            <main className="flex-grow overflow-y-auto w-full">
              {/* Votre contenu principal ici */}
            </main>
            <Navbar linkLeft={"/taches"} logoLeft={"/image/notebook.svg"} linkRight={"/recompense"} logoRight={"/image/crown.svg"}/>
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
    </>
  );
}
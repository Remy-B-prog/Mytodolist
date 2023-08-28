import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Title from '../component/Title';
import TaskCheckbox from '../component/TaskCheckbox';
import axios from 'axios';
import Badge from '../component/Badge';

export default function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [taskList, setTasklist] = useState("");
  const [badgeList, setBadgeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    let assignedTask = []; 
    let accomplishedTask = [];

    axios
      .get('/api/task/assigned')
      .then((res) => {
        if (res.data) {
          assignedTask = res.data; // Assigner les données aux variables déclarées
        }
        return axios.get('/api/task/accomplished'); // Renvoyer la promesse pour le chaînage
      })
      .then((res) => {
        if (res.data) {
          accomplishedTask = res.data; // Assigner les données aux variables déclarées

          const taskList = [];
          for (const task of assignedTask) {
            taskList.push({ ...task, state: 'assigned task', uniqueId: taskList.length + 1 });
          }
          for (const task of accomplishedTask) {
            taskList.push({ ...task, state: 'accomplished task', uniqueId: taskList.length + 1 });
          }
          taskList.sort(function (a, b) {
            var titleA = a.title.toUpperCase();
            var titleB = b.title.toUpperCase();

            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          });
          setTasklist(taskList);
          axios
            .get('/api/badge/')
            .then((res) => {
              setBadgeList(res.data);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(badgeList);


  const isMobile = windowWidth <= 1024;

  return (
    <>
      <div className="flex flex-col h-screen max-h-[100rem] w-full">
        {isMobile ? (
          <>
            <Title title={"Tableau de bord"} />
            <main className="flex-grow overflow-y-auto w-screen mb-26">
              <div className='flex flex-wrap gap-3 md:gap-6 justify-center mt-6'>
                {isLoading ? <div>chargement...</div> : taskList.map((e) => (
                  <div className='w-5/12 h-12 md:w-1/3 md:h-16'>
                    <TaskCheckbox key={e.id} text={e.title} state={e.state} />
                  </div>
                ))}
              </div>
              <div className="flex overflow-x-auto ms-4 mt-8 md:mt-16 mb-24 md:mb-32">
                {isLoading ?
                  <div>chargement...</div> :
                  badgeList.map((e) => (
                    <div className=' me-4'>
                      <Badge color={e.color} title={e.title} />
                    </div>
                  )
                  )
                }
              </div>
            </main>
            <Navbar linkLeft={"/taches"} logoLeft={"/image/notebook.svg"} linkRight={"/recompense"} logoRight={"/image/crown.svg"} />
          </>
        ) : (
          <>
            <Navbar />
            <main className=" flex flex-grow w-full ">
              <div className='w-1/2 h-full flex items-center pt-10'>
              <div className='flex flex-wrap gap-3 md:gap-6 h-5/6 lg:gap-3 justify-center items-center pb-12 overflow-y-auto '>
                {isLoading ? <div>chargement...</div> : taskList.map((e) => (
                  <div className='w-5/12 md:w-1/3 md:h-12'>
                    <TaskCheckbox key={e.id} text={e.title} state={e.state} />
                  </div>
                ))}
              </div>
              </div>
              <div className='w-1/2 h-full flex items-center pt-10'>
              <div className="flex flex-wrap lg:gap-6 justify-center ms-4 mt-28 h-5/6">
                {isLoading ?
                  <div>chargement...</div> :
                  badgeList.map((e) => (
                    <div className=' me-4'>
                      <Badge color={e.color} title={e.title} />
                    </div>
                  )
                  )
                }
              </div>
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
}
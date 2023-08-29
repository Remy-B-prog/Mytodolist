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
          assignedTask = res.data;
        }
        return axios.get('/api/task/accomplished');
      })
      .then((res) => {
        if (res.data) {
          accomplishedTask = res.data;
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
        setIsLoading(false);
      });
  }, []);

  const isMobile = windowWidth <= 1024;
  console.log(taskList.length);
  console.log(taskList);

  return (
    <>
      <div className="flex flex-col h-screen max-h-[100rem] w-full">
        {isMobile ? (
          <>
            <Title title={"Tableau de bord"} />
            <main className="flex-grow overflow-y-auto w-screen mb-26">
              <div className='flex flex-wrap gap-3 md:gap-6 justify-center mt-6'>
                {isLoading ? <div>chargement...</div> : taskList.map((e) => (
                  <div key={e.id} className='w-5/12 h-12 md:w-1/3 md:h-16 '>
                    <TaskCheckbox text={e.title} state={e.state} />
                  </div>
                ))}
              </div>
              <div className="flex overflow-x-auto ms-4 mt-8 md:mt-16 mb-24 md:mb-32">
                {isLoading ?
                  <div>chargement...</div> :
                  badgeList.map((e) => (
                    <div key={e.id} className=' me-4 '>
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
            <main className=" flex w-full h-screen ">
              <div className='w-1/2 h-full flex items-center pt-10'>
                <div className='flex flex-wrap gap-3 md:gap-6 mt-20 mb-10 lg:gap-3 justify-center items-start'>
                  {isLoading ?
                    <div> </div> :
                    taskList.length ?
                      taskList.map((e) => (
                        <div key={e.id} className='w-5/12 md:w-1/3 md:h-12'>
                          <TaskCheckbox text={e.title} state={e.state} />
                        </div>
                      ))
                      : <p className='text-lg text-center'> Vous n'avez aucune taches en cours vous pouvez en ajouter dans la page Taches </p>
                  }
                </div>
              </div>
              <div className='w-1/2 h-full flex items-center justify-center pt-10'>
                <div className='flex flex-wrap gap-3 md:gap-6 mt-20 mb-10 lg:gap-10 justify-center items-start w-4/5'>
                  {isLoading ?
                    <div> </div> :
                    badgeList.length ?
                      badgeList.map((e) => (
                        <div key={e.id} className=' me-4 flex items-center'>
                          <Badge color={e.color} title={e.title} />
                        </div>
                      )
                      ) :
                      <p className='text-lg text-center'>Aucun badge obtenu, réalisez des taches pour gagner des points et ainsi débloquer des badges </p>
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
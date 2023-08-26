import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Title from '../component/Title';
import TaskCheckbox from '../component/TaskCheckbox';
import axios from 'axios';

export default function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [taskList, setTasklist] = useState("");
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
    let assignedTask = [];  // Déclarer les variables en dehors des blocs .then()
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
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(taskList);

  const isMobile = windowWidth <= 1024;

  return (
    <>
      <div className="flex flex-col h-screen max-h-[100rem] w-full">
        {isMobile ? (
          <>
            <div className='mt-5'></div>
            <Title title={"Tableau de bord"} />
            <main className="flex-grow overflow-y-auto w-full">
              <div className='flex flex-wrap gap-3 justify-center mt-6 h-1/2 overflow-y-auto w-full'>
              {isLoading ? <div>chargement...</div> : taskList.map((e) => (
                <div className='w-5/12 h-12'>
                  <TaskCheckbox text={e.title} state={e.state} /> 
                </div>
              )) }
              </div>
              
            </main>
            <Navbar linkLeft={"/taches"} logoLeft={"/image/notebook.svg"} linkRight={"/recompense"} logoRight={"/image/crown.svg"} />
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
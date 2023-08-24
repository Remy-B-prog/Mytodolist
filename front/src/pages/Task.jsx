import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import TaskCard from '../component/TaskCard';
import Title from '../component/Title';
import TaskModal from '../component/TaskModal'
import TaskViewDesktop from '../component/TaskViewDesktop';
export default function Task() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [assignedTask, setAssignedTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modaltaskId, setModaltaskId] = useState('');

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
      .get('/api/task/assigned')
      .then((res) => {
        setAssignedTask(res.data)
        setModaltaskId(res.data[0].id)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const isMobile = windowWidth <= 1024;

  return (
    <>
<TaskModal modal ={modal} setModal={setModal} id={modaltaskId} taskList={[assignedTask]} /> 
      <div className="flex flex-col min-h-screen w-full">
        {isMobile ? (
          <>
            <div className='mt-10'></div>
            <Title title={"Taches"} />
            <main
              className='flex-grow overflow-y-auto overflow-hidden mb-32 md:flex md:items-center '
              
              >
              {isLoading ? <div>chargement...</div> :
                <div className='md:flex md:flex-wrap md:gap-5 md:justify-center'>
                  {assignedTask.map((e) =>
                    <div className='pt-5'>
                      <TaskCard key={e.id} id={e.id} title={e.title} point={e.earned_point} type={e.category} setModal={setModal} setModaltaskId={setModaltaskId}/>
                    </div>
                  )}

                </div>}
            </main>
            <Navbar linkLeft={"/tableau-de-bord"} logoLeft={"/image/login.svg"} linkRight={"/Add"} logoRight={"/image/add.svg"} />
          </>
        ) : (
          <>
            <Navbar />
            <main className="flex-grow overflow-y-auto w-full mt-32">
            <div>
                </div>
              {isLoading ? <div>chargement...</div> :
              <div className='flex h-full'>
                <div className='w-1/2 h-full flex items-center'>
                  <div className='flex flex-wrap gap-10 justify-center'>
                  {assignedTask.map((e) =>
                      <TaskCard key={e.id} id={e.id} title={e.title} point={e.earned_point} type={e.category} setModal={setModal} setModaltaskId={setModaltaskId}/>
                  )}
                  </div>
                </div>
                <div className='w-1/2'>
                  <TaskViewDesktop id={modaltaskId} taskList={[assignedTask]} />
                </div>
                </div>
                }
                
            </main>
          </>
        )}
      </div>
    </>
  );
}
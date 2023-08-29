import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import TaskCard from '../component/TaskCard';
import Title from '../component/Title';
import TaskModal from '../component/TaskModal'
import AddTaskModal from '../component/AddTaskModal';
import TaskViewDesktop from '../component/TaskViewDesktop';
import Button from '../component/Button';

export default function Task() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [assignedTask, setAssignedTask] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
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
        setAssignedTask([])
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [assignedTask])

  const handlAddTaskModal = (e) => {
    setAddTaskModal(true);
  }


  const isMobile = windowWidth <= 1024;

  return (
    <>
      <TaskModal modal={modal} setModal={setModal} id={modaltaskId} taskList={[assignedTask]} assignedTask={assignedTask} setAssignedTask={setAssignedTask} />
      <AddTaskModal modal={addTaskModal} setModal={setAddTaskModal} assignedTask={assignedTask} />
      <div className="flex flex-col h-screen max-h-[100rem] w-full">
        {isMobile ? (
          <>
            <div className='mt-5'></div>
            <Title title={"Taches"} />
            <main
              className='items-center mb-40 h-full md:flex'
            >
              <div className='md:w-full'>
                {isLoading ? <div> </div> :
                  <div className='flex flex-col items-center md:flex-row md:flex md:flex-wrap md:gap-5 md:justify-center'  >
                    {
                      assignedTask.length === 0 ? <p className='text-center'>Vous n'avez pas de tâche assignée.</p> :
                        assignedTask.map((e) =>
                          <div key={e.id} className='pt-5 md:w-1/3 w-4/5'>
                            <TaskCard id={e.id} title={e.title} point={e.earned_point} type={e.category} setModal={setModal} setModaltaskId={setModaltaskId} assignedTask={assignedTask} setAssignedTask={setAssignedTask} />
                          </div>
                        )

                    }
                  </div>
                }
              </div>
            </main>
            <Navbar linkLeft={"/tableau-de-bord"} logoLeft={"/image/login.svg"} linkRight={"/Add"} logoRight={"/image/add.svg"} setModalAddTask={setAddTaskModal} />
          </>
        ) : (
          <>
            <Navbar />
            <main className="flex-grow overflow-y-auto w-full  mt-32">
              <div className='h-full'>
                {isLoading ? <div> </div> :
                  <>
                    <div className='flex h-4/5'>
                      <div className='w-1/2 h-full flex items-center overflow-y-auto overflow-hidden'>
                        <div className='w-full'>
                          <div className='flex flex-wrap gap-5 items-center justify-center'>
                            {
                              assignedTask.length === 0 ? <p className='text-center'>Vous n'avez pas de tache assignée</p> :
                                assignedTask.map((e) =>
                                  <div className='w-1/3' key={e.id}>
                                    <TaskCard id={e.id} title={e.title} point={e.earned_point} type={e.category} setModal={setModal} setModaltaskId={setModaltaskId} assignedTask={assignedTask} setAssignedTask={setAssignedTask} />
                                  </div>
                                )}
                          </div>
                        </div>
                      </div>
                      <div className='w-1/2'>
                        {
                          assignedTask.length === 0 ? <div className='text-center'></div> :
                          <TaskViewDesktop id={modaltaskId} assignedTask={[assignedTask]} setAssignedTask={setAssignedTask} />
                        }
                      </div>
                    </div>
                    <div className='flex justify-center items-center h-1/5'>
                      <div className='w-1/2 max-w-md'>
                        <Button text='Ajouter une tache' logo="/image/cross-large.svg" handleSubmit={handlAddTaskModal} />
                      </div>
                    </div>
                  </>
                }
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
}
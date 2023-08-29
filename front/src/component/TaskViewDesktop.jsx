
import React, { useEffect } from 'react'
import Title from './Title'
import axios from 'axios'

export default function TaskViewDesktop({ id, setAssignedTask, assignedTask }) {

    const filteredTask = assignedTask[0].filter(task => task.id === id)[0];

    useEffect(() => {

    },[
        assignedTask
    ]);

    const handlValidateTask = (e) => {
        axios
            .post(`/api/task/validate-task/${id}`)
            .then(() => {
                setAssignedTask(assignedTask[0].filter(task => task.id !== id))
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <>
            {filteredTask ?
                <div className='flex justify-center w-full h-full backdrop-blur-sm '>
                    <div className={`bg-pink w-3/4 rounded-lg mt-10 md:mt-3 mb-2  border-2 border-black ${filteredTask.category === 'Taches ménagères' ? "bg-yellow" : "bg-pink"}`} >

                        <div className='flex flex-col justify-between w-full h-full pb-12 mt-12'>
                            <div className='text-center'>
                                <Title title={filteredTask.title} />
                            </div>
                            <div className='ms-5 me-5 mt-5 overflow-hidden max-h-60 overflow-y-auto overflow-hidden'>
                                <p className='text-lg md:text-2xl w-full text-center'>{filteredTask.description}</p>
                            </div>
                            <button className={`flex justify-around items-center h-20 ps-5 pe-5 w-full rounded-bl-lg rounded-br-lg ${filteredTask.category === 'Taches ménagères' ? "bg-yellowflash" : "bg-pinkflash"}`}
                                onClick={handlValidateTask}
                            >
                                <img src="/image/validation.svg" alt="validation" className='w-10 h-10' />
                                <p className='text-2xl'>{filteredTask.earned_point} pts</p>
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div></div>}
        </>
    )
}

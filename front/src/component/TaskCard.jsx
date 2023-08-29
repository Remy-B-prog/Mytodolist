import React from 'react'
import axios from 'axios'


export default function TaskCard({ id, title, point, type, setModal, setModaltaskId, setAssignedTask, assignedTask}) {


   const handleClick = (e) => {
        setModal(true)
        setModaltaskId(id)
    }

    const handlValidateTask = (e) => {
        axios
        .post(`/api/task/validate-task/${id}`)
        .then((response) => {
            setAssignedTask(assignedTask.filter(task => task.id !== id))
          })
        .catch((error) => {
          console.error(error);
        })
    }
console.log(type);

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col max-w-sm justify-center items-center h-full w-full'>
                <div className={`h-12 flex items-center w-full flex items-center justify-center rounded-t-lg ${type === 'Tâches ménagères' ? "bg-yellow" : "bg-pink"}`}>
                    <h2 className='truncate ... ps-2 pe-2'>{title}</h2>
                </div>
                <div className='flex w-full'>
                    <div className='flex w-full justify-between'>
                        <button className={`flex justify-around ps-10 pe-10 w-full rounded-bl-lg ${type === 'Tâches ménagères' ? "bg-yellowflash" : "bg-pinkflash"}`}
                        onClick={handlValidateTask}
                        >
                            <img src="/image/validation.svg" alt="validation" />
                            <p className='text-base'>{point} pts</p>
                        </button>
                        <button className='bg-grey w-10 justify-center flex items-center rounded-br-lg'>
                            <img 
                            src="/image/search.svg" alt="search"
                            onClick={handleClick} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

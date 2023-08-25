import React from 'react'
import axios from 'axios'


export default function TaskCard({ id, title, point, type, setModal, setModaltaskId, setAssignedTask, assignedTask}) {

    console.log(assignedTask);

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


    return (
        <div className='flex justify-center '>
            <div className='flex flex-col w-4/5 max-w-sm md:w-72 justify-center items-center h-20'>
                <div className={`h-12 flex items-center w-full flex items-center justify-center rounded-t-lg ${type=== 'Taches ménagère' ? "bg-yellow" : "bg-pink"}`}>
                    <h2 >{title}</h2>
                </div>
                <div className='flex w-full'>
                    <div className='flex w-full justify-between'>
                        <button className={`flex justify-around ps-10 pe-10 w-full rounded-bl-lg ${type=== 'Taches ménagère' ? "bg-yellowflash" : "bg-pinkflash"}`}
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

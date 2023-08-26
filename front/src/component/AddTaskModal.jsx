import React, { useState, useEffect } from 'react';
import Title from './Title';
import Button from './Button';
import axios from 'axios';

export default function AddTaskModal({ modal, setModal, assignedTask }) {
    const [addTask, setAddtask] = useState([]);
    const [selectedOption, setSelectedOption] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/task/addtask')
            .then((res) => {
                setAddtask(res.data)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [modal]);


    const handleClick = () => {
        setModal(false);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }



    const handleSubmit = (e) => {
        axios.post(`api/task/assign/${selectedOption}`)
            .then((response) => {
                const newAssignedTask = addTask.find(task => task.id === parseInt(selectedOption));
                assignedTask.push(newAssignedTask);
                setModal(false);
            });
    };



    if (modal ) {
        return (
            <div className='flex justify-center w-full h-full backdrop-blur-sm fixed z-50'>
                <div className={`bg-white w-3/4 h-3/4 md:w-3/5 md:h-3/5 rounded-lg mt-10 md:mt-32 lg:mt-40 2xl:mt-52 border-2 border-black max-w-[50rem] max-h-[50rem]`} >
                    <div
                        className='flex justify-end mr-5 mt-5 '
                        onClick={handleClick}>
                        <img src="/image/cross.svg" alt="" />
                    </div>
                    <div className='flex flex-col justify-between w-full h-full pb-12'>
                        <div className='flex flex-col items-center'>
                            <div className=' mb-10 text-center'>
                                <Title title="Ajouter une tache" />
                            </div>
                            <select
                                className=' p-2 h-10 mt-3 border border-gray-300 rounded-md bg-blue overflow-hidden overflow-y-scroll'
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                {!isLoading &&
                                    addTask.map(task => (
                                        <option key={task.id} value={task.id} className='p-2'>
                                            {task.title}
                                        </option>
                                    ))
                                }
                            </select>

                        </div>
                        <div className='mb-10 w-full flex justify-center'>
                            <div className='w-4/5'>
                                <Button text="Ajouter" type="submit" handleSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
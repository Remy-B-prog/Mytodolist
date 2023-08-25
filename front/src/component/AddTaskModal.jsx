import React, { useState } from 'react';
import Title from './Title';
import Button from './Button';

export default function AddTaskModal({ modal, setModal }) {
    const [selectedOption, setSelectedOption] = useState(""); // État pour stocker l'option sélectionnée

    const handleClick = () => {
        setModal(false);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    if (modal && window.innerWidth <= 1024) {
        return (
            <div className='flex justify-center w-full h-full backdrop-blur-sm fixed'>
                <div className={`bg-white w-3/4 h-3/4 md:w-3/5 md:h-3/5 rounded-lg mt-10 md:mt-32 border-2 border-black`} >
                    <div
                        className='flex justify-end mr-5 mt-5 '
                        onClick={handleClick}>
                        <img src="/image/cross.svg" alt="" />
                    </div>
                    <div className='flex flex-col justify-between w-full h-full pb-12'>
                        <div className='flex flex-col items-center'>
                            <div className='text-center'>
                                <Title title="Ajouter une tache" />
                            </div>
                            <select
                                className='w-4/5 p-2 mt-3 border border-gray-300 rounded-md bg-blue'
                                value={selectedOption}
                                onChange={handleOptionChange}
                            >
                                <option value="" >Sélectionnez</option>
    
                            </select>
                        </div>
                        <div className='mb-10 w-full flex justify-center'>
                            <div className='w-4/5'>
                                <Button text="Ajouter" type="submit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
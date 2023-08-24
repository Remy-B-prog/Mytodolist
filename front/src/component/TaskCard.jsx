import React from 'react'


export default function TaskCard({ id, title, point, type, setModal, setModaltaskId}) {

   const handleClick = (e) => {
        setModal(true)
        setModaltaskId(id)
    }

    return (
        <div className='flex justify-center '>

            {type === 'Taches ménagère' ? (<div className='flex flex-col w-4/5 max-w-sm md:w-72 justify-center items-center h-20'>
                <div className='h-12 flex items-center bg-yellow w-full flex items-center justify-center rounded-t-lg'>
                    <h2 >{title}</h2>
                </div>
                <div className='flex w-full'>
                    <div className='flex w-full justify-between'>
                        <button className='flex justify-around ps-10 pe-10 w-full bg-yellowflash rounded-bl-lg'>
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
            </div>)
                :
                <div className='flex flex-col w-4/5 max-w-sm md:w-72  justify-center items-center h-20'>
                    <div className='h-12 flex items-center bg-pink w-full flex items-center justify-center rounded-t-lg'>
                        <h2 >{title}</h2>
                    </div>
                    <div className='flex w-full'>
                        <div className='flex w-full justify-between'>
                            <button className='flex justify-around ps-10 pe-10 w-full bg-pinkflash rounded-bl-lg'>
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
                </div>}
        </div>
    )
}

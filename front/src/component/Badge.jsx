import React from 'react'

export default function Badge({color, title}) {
    console.log("composant",title);
    return (
        <div className={` flex flex-col items-center justify-center w-40 h-40  ${color && `bg-${color}`}`}>
            <img src="image/badge.svg" alt="Badge" className='w-10' />
            <h2 className='text-center text-md break-words w-40 line-clamp-2'>
                {title}
            </h2>
        </div>
    )
}

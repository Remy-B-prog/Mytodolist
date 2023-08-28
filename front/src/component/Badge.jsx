import React from 'react'

export default function Badge({color, title}) {
    return (
        <div className={` flex flex-col items-center justify-center w-32 h-32  md:w-52 md:h-40 ${color && `bg-${color}`}`}>
            <img src="image/badge.svg" alt="Badge" className='w-10' />
            <h2 className='text-center text-sm mt-2 break-words w-32 md:w-52  line-clamp-2'>
                {title}
            </h2>
        </div>
    )
}

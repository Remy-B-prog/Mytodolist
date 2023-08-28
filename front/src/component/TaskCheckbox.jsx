import React from 'react'

export default function TaskCheckbox({text, state}) {
  return (
    <div className={ ` flex w-full justify-between ${state === "accomplished task" ? "bg-green" : "bg-pinkflash"} items-center h-full`}>
        <p className=' md:text-lg truncate ... ps-2 w-3/4'>{text}</p>
        <img src ={state === 'accomplished task' ? "/image/checked.svg" : "/image/unchecked.svg"} className='w-10 pe-1'/>  
    </div>
  )
}

import React from 'react'

export default function input({ title, value, type, seter, placeholder }) {
  return (
    <div className='flex flex-col '>
      <label className="font-xl text-xl mb-2 mt-10" htmlFor="email-address ">
        {title}
      </label>
      <input
        className='bg-blue rounded-lg h-10 decoration-inherit focus:outline focus:outline-blue focus:outline-4'
        id={title}
        name={type}
        type={type}   
        value={value}
        onChange={(e) => seter(e.target.value)}
        required
        placeholder={placeholder}
      />
    </div>
  )
}

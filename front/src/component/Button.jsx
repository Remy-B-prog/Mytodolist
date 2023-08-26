import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button({ text, redirection, handleSubmit, type, color, logo}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (handleSubmit) {
      handleSubmit(e);
    } else {
      navigate(redirection);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick(event);
    }
  };


  return (
    <button
      className=' flex justify-around pl-5 pr-5 w-full rounded-lg h-14 md:h-20 bg-green hover:bg-greenfocus hover:cursor-pointer hover:outline-green-focus focus:outline focus:outline-green focus:outline-4 flex items-center justify-center text-2xl listener shadow-lg '
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type={type ? type : 'calltoaction'}
    >
      <p className='font-inika'>{text}</p>
      {logo && <img src = {logo} alt="logo" className='w-10 h-10'/>}
    </button>
  );
}
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button({ text, redirection }) {
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(redirection);
    }
  };

  return (
    <>
      <div
        className='rounded-lg h-14 md:h-20 bg-green hover:bg-greenfocus hover:cursor-pointer hover:outline-green-focus focus:outline focus:outline-green focus:outline-4 flex items-center justify-center text-2xl listener shadow-lg '
        onClick={() => navigate(redirection)}
        onKeyDown={handleKeyDown} 
        tabIndex={0}    
        role='button'
      >
        <p className='font-inika'>{text}</p>
      </div>    
    </>
  );
}
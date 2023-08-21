import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button({ text, redirection }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      navigate(redirection);
    };
    const buttonElement = document.querySelector('.rounded');
    buttonElement.addEventListener('click', handleClick);
    return () => {
      buttonElement.removeEventListener('click', handleClick);
    };
  }, [navigate, redirection]);

  return (
    <div className='rounded w-60 bg-red h-14'>
      <p>{text}</p>
    </div>
  );
}
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ linkLeft, logoLeft, linkRight, logoRight, setModalAddTask }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { userInfos } = useContext(AuthContext);

  const handleClick = () => {
    setModalAddTask(true);
  }


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 1024;

  return (
    <div className={`w-full ${isMobile ? 'fixed bottom-0 left-0 right-0 bg-white z-50' : 'fixed top-0 left-0 right-0 bg-white z-50 flex justify-center lg:border-t-0 lg:border-b-2 border-grey'
  }`}>
    <nav
      className='w-full flex justify-between items-center ps-5 pe-5 pt-3.5 pb-3.5 border-t-2 border-grey lg:border-t-0 lg:border-b-1 max-w-[150rem]'
    >
      {isMobile ? (
        <>
          <Link to={linkLeft}>
            <img src={logoLeft} alt="Logo" className="w-20 h-20 cursor-pointer" />
          </Link>
          {linkRight === "/Add" 
          ? 
          <button>
            <img src={logoRight} alt="Logo" className="w-20 h-20 cursor-pointer" onClick={handleClick} />
          </button>
          :
            <Link to={linkRight}>
              <img src={logoRight} alt="Logo" className="w-20 h-20 cursor-pointer" />
            </Link>}

        </>
      ) : (
        <>
          <Link to="/tableau-de-bord">
            <div className='flex flex-col items-center ms-2'>
              <img src="/image/login.svg" alt="Logo" className="w-10 h-10 cursor-pointer" />
              <p className='text-base' >Rémy</p>
            </div>
          </Link>
          <Link to="/taches">
            <p>Taches</p>
          </Link>
          <Link to="/tableau-de-bord">
            <p >Tableau de bord</p>
          </Link>
          <Link to="/recompense">
            <p>Récompense</p>
          </Link>
        </>
      )}
    </nav>
    </div>
  );
}
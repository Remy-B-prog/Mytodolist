import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../component/Navbar';
import { AuthContext } from "../context/AuthContext";

export default function Task() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  console.log(userInfos);

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
    <>
      <div className="flex flex-col min-h-screen w-full">
        {isMobile ? (
          <>
            <main className="flex-grow overflow-y-auto w-full">
              {/* Votre contenu principal ici */}
            </main>
            <Navbar />
          </>
        ) : (
          <>
            <Navbar />
            <main className="flex-grow overflow-y-auto w-full">
              {/* Votre contenu principal ici */}
            </main>
          </>
        )}
      </div>
    </>
  );
}
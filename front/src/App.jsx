
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { VITE_BACKEND_URL } = import.meta.env;
  const { setUserInfos } = useContext(AuthContext);

  return (
    <>
      <Router>
        <div className='flex justify-center'>
        <Routes/>
        </div>
      </Router>
    </>
  )
}

export default App


import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "./context/AuthContext";

function App() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const { setUserInfos } = useContext(AuthContext);
  axios.defaults.baseURL = backUrl;
  axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
    "userToken"
  )}`;

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

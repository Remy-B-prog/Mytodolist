
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";
import { useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "./context/AuthContext";

function App() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const { setUserInfos, userInfos } = useContext(AuthContext);
  axios.defaults.baseURL = backUrl;
  axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
    "userToken"
  )}`;

useEffect(() => {
   if(Cookies.get("userToken")){
    axios
    .get("/api/user/reconnect")
    .then((res) => {
      setUserInfos({
        userId: res.data.id,
        userFirstName: res.data.firstname.charAt(0).toUpperCase(0) + res.data.firstname.slice(1),
        userEmail: res.data.email,
      });
    })
    .catch((err) => {
      console.log(err);
    });
   }
},[]);

  return (
    <>
      <Router>
        <div className='w-full flex justify-center'>
        <div className='flex justify-center max-w-[150rem] w-full'>
        <Routes/>
        </div>
        </div>
      </Router>
    </>
  )
}

export default App

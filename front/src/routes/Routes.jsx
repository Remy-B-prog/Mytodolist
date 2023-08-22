import React, { useContext} from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Task from '../pages/Task'
import Dashboard from '../pages/Dashboard'
import Rewards from '../pages/Rewards'
import { AuthContext } from "../context/AuthContext";

export default function routes() {
  const { userToken } = useContext(AuthContext);
  console.log(userToken);

  const PrivateRoute = ({ element, path }) => {
    if (userToken) {
      return element;
    } else {
      return <Navigate to="/" replace />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/connexion" element={<Login />} />
        <Route
          path="/taches"
          element={<PrivateRoute element={<Task />} />} />
        <Route
          path="/tableau-de-bord"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/recompense"
          element={<PrivateRoute element={<Rewards />} />}
        />
      </Routes>
    </>
  )
}

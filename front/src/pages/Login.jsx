import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../component/Button';
import axios from "axios";
import Title from "../component/Title";
import Input from "../component/Input";

import { AuthContext } from "../context/AuthContext";



export default function Login() {

  const { setUserTokenCookie, setUserInfos } = useContext(AuthContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/user/login`, {
        email,
        password,
      })
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        if (!response) {
          throw new Error("La connection a échoué");
        }
        if (response.data.token) {
          setUserTokenCookie(response.data.token);
          setUserInfos({
            userId: response.data.user.id,
            userFirstName: response.data.user.firstname,
            userLastName: response.data.user.lastname,
            userEmail: response.data.user.email,
            isAdmin: response.data.user.admin,
          });
          navigate("/taches");
        }
      });
  };

  return (
    <div >
      <div className='mb-10 mt-10'>
      <Title title="Se connecter"/>
      </div>
      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
      >
        <div className='mb-20'>
          <Input title="Email :" value={email} seter={setemail} type ="email" placeholder={"  Exemple@gmail.com"}/>
          <Input title="Password :" value={password} type={"password"}seter={setPassword} placeholder ={"  Entrez votre mot de passe"}/>
        </div>
        <div>
          <Button text="Se connecter" redirection={"/"} handleSubmit={handleSubmit} type="submit" />
        </div>
      </form>
    </div>
  );
}


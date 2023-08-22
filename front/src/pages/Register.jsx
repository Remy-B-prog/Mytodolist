
import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../component/Button';
import axios from "axios";
import Title from "../component/Title";
import Input from "../component/Input";

import { AuthContext } from "../context/AuthContext";


export default function Register() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  console.log(firstName);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/user/register`, {
        email,
        password,
        firstname: firstName,
      })
      .then((response) => {
        if (!response) {
          throw new Error("La connection a échoué");
        } else {
          navigate("/connexion");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const btn =
    email === "" ||
      password === "" ||
      password !== confirmPassword ||
      firstName === "" ? (
        // <Button text="S'enregistrer" redirection={"/connexion"} handleSubmit={handleSubmit} type="submit" />
        <button className=" w-full rounded-lg h-14 md:h-20 bg-greysoft focus:outline focus:outline-grey focus:outline-4 flex items-center justify-center text-2xl listener shadow-lg " type="submit"><p className="font-inika">Se connecter</p></button>
    ) : (
      <Button text="Se connecter" redirection={"/"} handleSubmit={handleSubmit} type="submit" />
    );

  return (
    <div >
      <div className='mb-5 mt-5'>
        <Title title="S'inscrire" />
      </div>
      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
      >
        <div className='mb-20'>
          <Input title = "Prénom" value ={firstName} seter={setFirstName} type ="text" placeholder ={"  dupont"}/>
          <Input title="Email :" value={email} seter={setEmail} type="email" placeholder={"  Exemple@gmail.com"} />
          <Input title="Mot de passe :" value={password} type={"password"} seter={setPassword} placeholder={"  Entrez votre mot de passe"} />
          <Input title="Confirmation du mot de passe :" value={confirmPassword} type={"password"} seter={setConfirmPassword} placeholder={"  Confirmer mot de passe "} />
        </div>
        <div className='mb-5'>
          {btn}
        </div>
      </form>
    </div>
  )
}

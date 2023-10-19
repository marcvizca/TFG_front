import React, {useState} from 'react';
import {signOut} from 'firebase/auth'
import { auth } from '../firebase.js';
import {useNavigate } from 'react-router-dom';
import { showNotification } from '../components/showNotification'

const SignOut = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut()
          .then(() => {
            console.log("Logout successful");
            navigate("/" );
            showNotification("Logout successful");
          })
          .catch((error) => {
            console.log("Logout error:", error);
            showNotification("Algo salió mal", "error");
          });
    };

  return (
    <button className="logoutBut" onClick={handleLogout}>Logout</button>
  );
};

export default SignOut;

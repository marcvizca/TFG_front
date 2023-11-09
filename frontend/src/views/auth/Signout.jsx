import React, {useState, useContext, useEffect} from 'react';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase.js';
import {useNavigate } from 'react-router-dom';
import { showNotification } from '../../components/showNotification'
import { logOutUser } from '../../controllers/services.controller.js';
import AuthContext from '../../context/AuthProvider';

const SignOut = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    
    const logOut = async () => {
      try {
        setAuth({});
        const response = await logOutUser();
        console.log(response);
        navigate("/");
        showNotification("Logout successful");
      } catch (error) {

      }
    };

    useEffect(() => {
      logOut();
  }, []);

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
    <div></div>
    //<button className="logoutBut" onClick={handleLogout}>Logout</button>
  );
};

export default SignOut;

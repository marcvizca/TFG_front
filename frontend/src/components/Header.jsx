import React, { useEffect, useState } from "react";
import './header.css'
import { Link } from 'react-router-dom';
import Menu from './Menu'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase.js';
import SignOut from "../auth/Signout";


const Header = () => {
    const [log, setLog] = useState(null);

    useEffect(() => {
        const logged = onAuthStateChanged(auth, async (user) => {
            
            if (user) {
                setLog(user);
            } else {
                setLog(null);
            }
        });

        return () => {
            logged();
        };
    }, []);

    return(
        <>
            {log && (
            <ul className="nav">
                <Menu />
                <h1> Bienvenido {auth.currentUser.email} </h1>
                <li>
                    <Link to="/home"><button>Home</button></Link>
                </li>
                <br />
                <li>
                    <Link to="/prueva"><button>Pureva</button></Link>
                </li>
                <li>
                    <SignOut  />
                </li>
            </ul>
            )}
        </>
    );
};

export default Header;
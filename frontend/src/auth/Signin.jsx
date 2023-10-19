import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase.js';
import { NavLink, useNavigate } from 'react-router-dom';
import Signup from './Signup.jsx';
import { showNotification } from '../components/showNotification'

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate('/header');
            showNotification("Bienvenido!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if (error.code === 'auth/wrong-password') {
                showNotification("Contraseña incorrecta", "error")
              } else if (error.code === 'auth/user-not-found') {
                showNotification("Usuario no encontrado", "error")
              } else {
                showNotification("Algo salió mal", "error")
              }
        });
       
    }

    return (
        <>
            <main>
                <section>
                    <div>
                        <p> TFG APP </p>

                        <form>
                            <div>
                                <label htmlFor='email-address'> Email address</label>
                                <input
                                    id='email-address'
                                    name='email'
                                    type={email}
                                    required
                                    placeholder='Email address'
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>
                        </form>
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to = "/signup">
                                Sign up
                            </NavLink>
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Signin;
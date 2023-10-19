import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Header from './components/Header'
import Prueva from './prueva/Prueva'
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

function App() {  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element = { <Signin /> } />
      <Route path='/signup' exact element = { <Signup /> } />
      <Route path='/header' exact element = { <Header /> } />
      <Route path='/home' exact element = {<Home /> } />
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wellness from './views/polls/Wellness.jsx';
import Signin from './views/auth/Signin.jsx';
import Signup from './views/auth/Signup.jsx';
import Signout from './views/auth/Signout.jsx';
import CreateTeam from './views/teams/CreateTeam.jsx';
import TeamsSelector from './views/teams/TeamsSelector.jsx';
import Header from './components/Header.jsx';
import Team from './views/teams/Team.jsx';
import Rpe from './views/polls/Rpe.jsx';
import RequireAuth from './components/requireAuth.js';
import PersistLogin from './views/auth/PersistLogin.js';

function App() { 
  return (
    //<BrowserRouter>
    <div>
      <Header />
      <Routes>
          <Route path='/' exact element = { <Signin /> } />
          <Route path='logout' exact element = { <Signout /> } />
          <Route path='signup' exact element = { <Signup /> } />

          <Route element={<PersistLogin />} >
          <Route element = { <RequireAuth /> } >
            <Route path='teams' exact element = {<TeamsSelector /> } />
            <Route path='createteam' exact element = { < CreateTeam /> } />
            <Route path='team/:teamId' exact element = {<Team /> } />
            <Route path='team/:teamId/wellness' exact element = {<Wellness /> } />
            <Route path='team/:teamId/rpe' exact element = {<Rpe /> } />

          </Route>
          </Route> 
      </Routes>
      </div>
      
    //</BrowserRouter>
  );
}

export default App;

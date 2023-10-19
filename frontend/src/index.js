import React from 'react';
import {createRoot}  from 'react-dom/client';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import App from './App';
import Toastify from 'toastify-js'

const root = createRoot(document.getElementById('root'))
root.render(
<App />
);

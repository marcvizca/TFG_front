import React from 'react';
import {createRoot}  from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const root = createRoot(document.getElementById('root'))
root.render(
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
);

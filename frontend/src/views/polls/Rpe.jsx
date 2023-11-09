import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './wellness.css';
import Button from '@mui/material/Button';
import { showNotification } from '../../components/showNotification';
import { postRpe } from "../../controllers/services.controller";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function Home () {
  const [rpe, setRpe] = useState();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { teamId } = useParams();

  const handleSubmit = async (e) => {
    if (rpe) {
        e.preventDefault();
        await postResult();
        navigate(-1);
        showNotification("RPE aswered succesfully");
    }
    else console.log("Selecciona una opció"); //modificar per mostrar avis o no deixar clicar
  };

  const options = [...Array(10)].map((x, i) => (i + 1));

  const postResult = async () => {
    console.log("RPE:", rpe);
    const response = await postRpe(userId, teamId, rpe);
    console.log("RESPONSE", response);
  }

  const handleChange = (e) => {
    setRpe(e.target.value);
  };


  return (
    <>
    <Container component="main" maxWidth="sm">
    <CssBaseline />
        <form onSubmit={handleSubmit}>
            <h1>Questionario RPE</h1>
            <div className='question-container'>
                <label>Fatiga Entrenamiento</label>
                <div className='answers-input'>
                    {options.map(option => (
                    <div key={option}>
                    <input
                    className='answer-option'
                    type="radio"
                    value={option}
                    name="answer"
                    onChange={handleChange}
                    />
                    <label>{option}</label>
                
                    </div>
                    ))}
                </div>
                <Button type='submit' className="app-button" sx={{ mt: 3, mb: 2 }}>Enviar</Button>
            </div>
            <br />
        </form>
    </Container>
    </>
  );
};

export default Home;
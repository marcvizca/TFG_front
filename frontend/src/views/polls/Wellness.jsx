import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './wellness.css';
import { postWellness } from "../../controllers/services.controller";
import { showNotification } from '../../components/showNotification';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function Home () {
  const [answers, setAnswers] = useState({});
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { teamId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    postAnswers();
    navigate(-1);
    showNotification("Wellness answered succesfully");
  };

  const postAnswers = async () => {
    const response = await postWellness(userId, teamId, answers);
  }

  const nextQuestion = () => {
    const currentAnswer = document.querySelector("input[name='" + questions[currentQuestion].name + "']:checked");
    if(currentAnswer) {
      setQuestionAnswers([...questionAnswers, currentAnswer.value]);
      clearSelection();
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Selecciona una opcio"); //modificar per mostrar avis
    }
  };

  const lastQuestion = () => {
    const currentAnswer = document.querySelector("input[name='" + questions[currentQuestion].name + "']:checked");
    if(currentAnswer) {
      setQuestionAnswers([...questionAnswers, currentAnswer.value]);
    }
    else console.log("selecciona una opcio"); //modificar per mostrar avis
  }

  const clearSelection = () => {
    const allRadios = document.querySelectorAll("input[type='radio']");
    allRadios.forEach(radio => {
        radio.checked = false;
    });
  }

  const questions = [
        {
        id: 1,
        name: "sleep",
        text: "¿CALIDAD DEL SUEÑO?",
        options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 2,
            name: "fatigue",
            text: "FATIGA/CANSANACIO?",
            options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 3,
            name: "pain",
            text: "¿DAÑO MUSCULAR GENERAL?",
            options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 4,
            name: "stress",
            text: "¿PERCCEPCIÓN DE ESTRÉS?",
            options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 5,
            name: "mood",
            text: "¿ESTADO DE ÁNIMO?",
            options: [...Array(7)].map((x, i) => (i + 1))
        }
  ]
  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  };

  const renderQuestions = () => {
    const question = questions[currentQuestion];
    return (
        
            <div className='question-container'>
            <label>{question.text}</label>
            <div className='answers-input'>
                {question.options.map(option => (
                <div key={option}>
                    <input
                    className='answer-option'
                    type="radio"
                    name={question.name}
                    value={option}
                    onChange={handleChange}
                    />
                    <label>{option}</label>
                </div>
                ))}
            </div>
            
            {currentQuestion !== questions.length - 1  ? (
                <button type='button' onClick={() => {nextQuestion()}}>Siguiente</button>
            ) : (
                <div>
                <button type='submit' onClick={() => lastQuestion()}>Enviar</button>
                </div>
            )}
        </div>
    )
  }
  return (
    <>
      <Container component="main" maxWidth="sm">
      <CssBaseline />
        <form onSubmit={handleSubmit}>
            <h1>Questionario Wellness</h1>
                {renderQuestions()}
            <br />
        </form>
      </Container>
    </>
  );
};

export default Home;

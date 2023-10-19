import React, { useState } from "react";
import './home.css';
import Axios from "axios";

function Home () {
  const [answers, setAnswers] = useState({});
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    postWellness();
  };

  const postWellness = async () => {
    const response = await Axios.post("http://localhost:8000/api/poll", {
      user_id: "1",
      team_id: "2",
      date: "2023-11-10"
    })
    console.log("RESPONSE", response);
  }

  const nextQuestion = () => {
    const currentAnswer = document.querySelector("input[name='" + questions[currentQuestion].id + "']:checked").value;
    setQuestionAnswers([...questionAnswers, currentAnswer]);
    clearSelection();
    setCurrentQuestion(currentQuestion + 1);
  };

  const lastQuestion = () => {
    const currentAnswer = document.querySelector("input[name='" + questions[currentQuestion].id + "']:checked").value;
    setQuestionAnswers([...questionAnswers, currentAnswer]);
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
        text: "¿CALIDAD DEL SUEÑO?",
        options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 2,
            text: "FATIGA/CANSANACIO?",
            options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 3,
            text: "¿DAÑO MUSCULAR GENERAL?",
            options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 4,
            text: "¿PERCCEPCIÓN DE ESTRÉS?",
            options: [...Array(7)].map((x, i) => (i + 1))
        },
        {
            id: 5,
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
                    name={question.id}
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

  const ResultsPage = () => (
    <div>
        <h1>Resultados</h1>
        <div>
            {questionAnswers.map((answer, i) => (
                <p>Pregunta {i+1}: {answer}</p>
            ))}
        </div>
    </div>
  );

  return (
    <>
    {submitted ? (
        <ResultsPage />
    ) : (
        <form onSubmit={handleSubmit}>
            <h1>Questionario Wellness</h1>
                {renderQuestions()}
            <br />
        </form>
        )}
    </>
  );
};

export default Home;

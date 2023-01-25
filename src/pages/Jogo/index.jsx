import React, { useState, useEffect } from 'react';
import QuestCard from '../../components/QuestCard';
import { fetchTriviaQuestion } from '../../helpers/api';

const Jogo = () => {
  // Iniciando os estados do compomente
  const [isLoading, setIsLoading] = useState(true);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [index, setIndex] = useState(0);

  // Embaralha um array
  const shuffle = (array) => {
    const diff = 0.5;
    array.sort(() => Math.random() - diff);
    return array;
  };

  useEffect(() => {
    // Separa as informações vindas da API e as organiza nos states
    const createAnswers = (questions) => {
      questions.forEach(({
        incorrect_answers: incorrect,
        correct_answer: correct,
        question,
        category,
      }) => {
        setAllQuestions((prevState) => [...prevState, {
          question,
          category,
          answers: shuffle([...incorrect, correct]),
          correct,
        }]);
      });
      setIsLoading(false);
    };

    // Faz a requisição das perguntas para a API
    const fetchQuestions = async () => {
      const questions = await fetchTriviaQuestion();
      createAnswers(questions);
    };

    fetchQuestions();
  }, []);

  // Remove a estilização que define a pergunta certa e errada
  const resetClassList = () => {
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach((btn) => {
      btn.className = 'answer-btn';
    });
  };

  const handleNext = () => {
    // Passa para a próxima pergunta
    setIndex(index + 1);

    resetClassList();
  };

  return (
    <>
      <header>AQUI</header>
      <div className="quest-body">
        <div className="quest-card">
          { isLoading ? <h1>LOADING...</h1>
            : QuestCard(allQuestions[index], setNextBtnStatus) }
          { nextBtnStatus
            ? <button type="button" onClick={ handleNext }>Next</button>
            : ''}
        </div>
      </div>
      <footer>FECHA AQUI</footer>
    </>
  );
};

export default Jogo;

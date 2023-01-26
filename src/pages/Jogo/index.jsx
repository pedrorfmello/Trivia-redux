import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuestCard from '../../components/QuestCard';
import { fetchTriviaQuestion } from '../../helpers/api';
import { decodeHTML } from '../../helpers/decoder';
import { shuffle } from '../../helpers/shuffle';

const Jogo = () => {
  const history = useHistory();
  const maxQuests = 5;
  // Iniciando os estados do compomente
  const [isLoading, setIsLoading] = useState(true);
  const [nextBtnStatus, setNextBtnStatus] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  // Estados do componente QuestCard
  const questTime = 30;
  const [timer, setTimer] = useState(questTime);
  const [gameTimeout, setGameTimeout] = useState(false);

  // Decodifica string html ou array de strings
  const decode = (encodedHTML) => {
    if (typeof (encodedHTML) !== 'string') {
      let newArr = [];
      encodedHTML.forEach((answer) => {
        newArr = [...newArr, decodeHTML(answer)];
      });
      return newArr;
    }
    return decodeHTML(encodedHTML);
  };

  useEffect(() => {
    // Separa as informações vindas da API e as organiza nos states
    const createAnswers = (questions) => {
      questions.forEach(({
        incorrect_answers: incorrect,
        correct_answer: correct,
        question,
        category,
        difficulty,
      }) => {
        setAllQuestions((prevState) => [...prevState, {
          question: decode(question),
          category,
          correct: decode(correct),
          answers: shuffle([...decode(incorrect), decode(correct)]),
          difficulty,
        }]);
      });
      // Remove a mensagem "Carregando..." da tela
      setIsLoading(false);
    };

    // Faz a requisição das perguntas para a API
    const fetchQuestions = async () => {
      const questions = await fetchTriviaQuestion();
      createAnswers(questions);
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    // Quando chega na última pergunta redireciona para a tela de feedback
    if (index === maxQuests - 1) {
      history.push('/feedback');
    }
    // Passa para a próxima pergunta
    setIndex(index + 1);
    // Reseta o tempo do contador
    setTimer(questTime);
    // Reativa o contador
    setGameTimeout(false);
  };

  return (
    <>
      <header>AQUI</header>
      <div className="quest-body">
        <div className="quest-card">
          { isLoading
            ? <h1>Carregando...</h1>
            : (
              <QuestCard
                key={ index }
                quest={ allQuestions[index] }
                timer={ timer }
                setTimer={ setTimer }
                gameTimeout={ gameTimeout }
                setGameTimeout={ setGameTimeout }
                setNextBtnStatus={ setNextBtnStatus }
              />) }
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

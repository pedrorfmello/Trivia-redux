import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './QuestCard.css';
import { useDispatch } from 'react-redux';
import { changeScore } from '../../redux/actions/game';

const QuestCard = ({
  quest, timer, setTimer, gameTimeout, setGameTimeout, setNextBtnStatus }) => {
  const { question, category, answers, correct, difficulty } = quest;

  const dispatch = useDispatch();

  // Cronômetro do jogo
  useEffect(() => {
    const intervalTime = 1000;

    const interval = setInterval(() => {
      if (gameTimeout) {
        return () => clearInterval(interval);
      }
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setGameTimeout(true);
        setNextBtnStatus(true);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [gameTimeout, setGameTimeout, setTimer, timer, setNextBtnStatus]);

  // Seleciona todos as respostas e adiciona a classe de estilização das respostas erradas e corretas
  const findAndSetClassName = () => {
    const allButtons = document.querySelectorAll('.answer-btn');
    let wrongIndex = 0;

    allButtons.forEach((button) => {
      if (button.innerText === correct) {
        button.classList.add('answer-correct');
        button.setAttribute('data-testid', 'correct-answer');
      } else {
        button.classList.add('answer-wrong');
        button.setAttribute('data-testid', `wrong-answer-${wrongIndex}`);
        wrongIndex += 1;
      }
    });
  };

  // Calcula a pontuação do jogador seguindo a regra de negócio
  const calculateScore = () => {
    const baseValue = 10;
    const multipliers = { hard: 3, medium: 2, easy: 1 };

    const score = baseValue + (timer * multipliers[difficulty]);

    // Atualiza a pontuação do jogador no Redux
    dispatch(changeScore({
      score,
      assertions: 1,
    }));
  };

  // Confere se a resposta seleciona é a correta
  const handleClick = ({ target }) => {
    findAndSetClassName();
    setGameTimeout(true);
    if (target.innerText === correct) {
      calculateScore();
      setNextBtnStatus(true);
    } else {
      setNextBtnStatus(true);
    }
  };

  return (
    <>
      <div>
        <h3 data-testid="question-category">{ category }</h3>
        <h2>{ question }</h2>
      </div>
      <h1>{ timer }</h1>
      <div data-testid="answer-options">
        { answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            className="answer-btn"
            onClick={ handleClick }
            disabled={ gameTimeout }
            data-testid="question-text"
          >
            { answer }
          </button>)) }
      </div>
    </>
  );
};

QuestCard.propTypes = {
  quest: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
  timer: PropTypes.number.isRequired,
  setTimer: PropTypes.func.isRequired,
  gameTimeout: PropTypes.bool.isRequired,
  setGameTimeout: PropTypes.func.isRequired,
  setNextBtnStatus: PropTypes.func.isRequired,
};

export default QuestCard;

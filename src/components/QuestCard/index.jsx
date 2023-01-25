import React from 'react';
import './QuestCard.css';

const QuestCard = (quest, setNextBtnStatus) => {
  const { question, category, answers, correct } = quest;

  // Seleciona todos as respostas e adiciona a classe 'answer-wrong' apenas nas respostas erradas
  const findAndSetClassName = () => {
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach((btn) => {
      if (!btn.classList.contains('answer-correct')) {
        btn.classList.add('answer-wrong');
      }
    });
  };

  // Confere se a resposta seleciona é a correta
  const handleClick = ({ target }) => {
    if (target.innerText === correct) {
      target.classList.add('answer-correct');
      setNextBtnStatus(true);
      findAndSetClassName();
    }
  };

  return (
    <>
      <div>
        <h3>{ category }</h3>
        <h2>{ question }</h2>
      </div>
      <div>
        { answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            className="answer-btn"
            onClick={ handleClick }
          >
            { answer }
          </button>)) }
      </div>
    </>
  );
};

export default QuestCard;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { hashEmail } from '../../helpers/hashEmail';
import { setLocalRanking } from '../../helpers/localStorage';

const Feedback = () => {
  const { score, assertions, playerName, gravatarEmail } = useSelector(
    (state) => state.player,
  );
  const condition = 3;

  useEffect(() => {
    const playerScoreInfo = {
      playerName,
      score,
      photo: hashEmail(gravatarEmail),
    };

    setLocalRanking(playerScoreInfo);
  });

  return (
    <>
      <Header />
      <div className="feedback-container">
        <div data-testid="feedback-text">
          {assertions < condition ? 'Could be better...' : 'Well Done!'}
        </div>
        <div>
          Pontuação final:
          <span data-testid="feedback-total-score">{score}</span>
        </div>
        <div>
          Você acertou:
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
      </div>
      <Link to="/">
        <input data-testid="btn-play-again" type="button" value="Jogar Novamente" />
      </Link>
      <Link to="/ranking">
        <input data-testid="btn-ranking" type="button" value="Ranking" />
      </Link>
    </>
  );
};

export default Feedback;

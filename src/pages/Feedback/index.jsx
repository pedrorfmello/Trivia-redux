import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { hashEmail } from '../../helpers/hashEmail';
import { setLocalRanking } from '../../helpers/localStorage';
import { resetGame } from '../../redux/actions/game';
import './Feedback.css';

const Feedback = () => {
  const { score, assertions, playerName, gravatarEmail } = useSelector(
    (state) => state.player,
  );
  const dispatch = useDispatch();
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
    <div className="feedback-page">
      <Header />
      <div className="feedback-container">
        <div data-testid="feedback-text" className="message">
          {assertions < condition ? 'Could be better...' : 'Well Done!'}
        </div>
        <div className="pontuacao-feed">
          <p>Pontuação final:</p>
          <span data-testid="feedback-total-score">{score}</span>
        </div>
        <div className="pontuacao-feed">
          <p>Você acertou:</p>
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <div className="feedback-btns">
          <Link to="/">
            <input
              data-testid="btn-play-again"
              type="button"
              value="Jogar Novamente"
              className="feed-btn"
              onClick={
                dispatch(resetGame)
              }
            />
          </Link>
          <Link to="/ranking">
            <input
              data-testid="btn-ranking"
              className="feed-btn"
              type="button"
              value="Ranking"
            />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;

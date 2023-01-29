/* eslint-disable no-magic-numbers */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { getLocalRanking } from '../../helpers/localStorage';
import './ranking.css';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  const orderRanking = (players) => players.sort((a, b) => b.score - a.score);

  useEffect(() => {
    const localRanking = orderRanking(getLocalRanking());
    setRanking(() => [...localRanking]);
  }, [setRanking]);

  return (
    <div className="ranking-page">
      <div className="ranking-header">
        <h1>RANKING</h1>
        <Link to="/">
          <input
            data-testid="btn-go-home"
            className="rk-btn"
            type="button"
            value="Inicio"
          />
        </Link>
      </div>
      <div className="ranking">
        <div className="ranking-container">
          {ranking.map(({ name, score, picture }, index) => (
            <div key={ index } className="ranking-item">
              <img className="avatar" src={ picture } alt={ `Gravatar de ${name}` } />
              <h4>
                <span>
                  {`${index + 1}º. `}
                  {' '}
                </span>
                <span data-testid={ `player-name-${index}` }>{name}</span>
              </h4>
              <h4 data-testid={ `player-score-${index}` }>{score}</h4>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ranking;

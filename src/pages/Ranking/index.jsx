/* eslint-disable no-magic-numbers */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocalRanking } from '../../helpers/localStorage';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  const orderRanking = (players) => players.sort((a, b) => b.score - a.score);

  useEffect(() => {
    const localRanking = orderRanking(getLocalRanking());
    setRanking(() => [...localRanking]);
  }, [setRanking]);

  return (
    <>
      <h1>RANKING</h1>
      <div className="ranking-page">
        <div className="ranking-container content-wrap">
          {ranking.map(({ name, score, picture }, index) => (
            <div key={ index } className="ranking-item">
              <h4>
                <span>
                  {`${index + 1}º. `}
                  {' '}
                </span>
                <span data-testid={ `player-name-${index}` }>{name}</span>
              </h4>
              <h4 data-testid={ `player-score-${index}` }>{score}</h4>
              <img className="avatar" src={ picture } alt={ `Gravatar de ${name}` } />
            </div>
          ))}
          <Link to="/">
            <input data-testid="btn-go-home" type="button" value="Inicio" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Ranking;

import React from 'react';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';
import triviaLogo from '../../trivia.png';
import './Header.css';

const Header = () => {
  const { playerName, gravatarEmail, score } = useSelector((state) => state.player);
  const emailHash = md5(gravatarEmail).toString();
  const photoLink = `https://www.gravatar.com/avatar/${emailHash}`;

  return (
    <header>
      <img src={ triviaLogo } className="Trivia-logo Login-logo" alt="logo" />
      <div className="usuario">
        <div className="jogador">
          <h6>Jogador</h6>
          <p data-testid="header-player-name">{playerName}</p>
        </div>
        <div className="pontuacao">
          <h6>Pontuação</h6>
          <p data-testid="header-score">{score}</p>
        </div>
      </div>
      <img
        data-testid="header-profile-picture"
        className="avatar"
        src={ photoLink }
        alt={ `Gravatar de ${playerName}` }
      />
    </header>
  );
};

export default Header;

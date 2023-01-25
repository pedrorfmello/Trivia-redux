import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import triviaLogo from '../../trivia.png';
import { loginUser } from '../../redux/actions/login';
// import * as api from '../../helpers/api';

const Login = () => {
  // Instancia o dispatch
  const dispatch = useDispatch();

  // Iniciando os estados do compomente
  const [btnStatus, setBtnStatus] = useState(true);
  const [playerInfo, setPlayerInfo] = useState({
    playerName: '',
    email: '',
  });

  const onClickButton = async () => {
    // Envia as informações dos usuários para o Redux
    dispatch(loginUser(playerInfo));

    await api.getTriviaToken();
  };

  // Valida dos inputs para liberação do botão "Jogar"
  useEffect(() => {
    const emailValidation = () => {
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!playerInfo.email || regex.test(playerInfo.email) === false) {
        return false;
      }
      return true;
    };

    const nameValidation = () => {
      const minLength = 3;
      if (playerInfo.playerName.length < minLength) {
        return false;
      }
      return true;
    };

    if (emailValidation() && nameValidation()) {
      setBtnStatus(false);
    }
  }, [playerInfo]);

  // Lida com os dados do input
  const changeInput = ({ target }) => {
    const { id, value } = target;
    setPlayerInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="login">
      <div className="login-body">
        <img src={ triviaLogo } className="login-logo" alt="Logo Trivia" />
        <div className="login-form">
          <h2>Bem-vindo, insira suas informações para jogar.</h2>
          <label htmlFor="playerName">
            Nome:
            {' '}
            <input
              required
              data-testid="input-player-name"
              id="playerName"
              type="playerName"
              value={ playerInfo.playerName }
              onChange={ changeInput }
            />
          </label>
          <label htmlFor="playerName">
            Email:
            {' '}
            <input
              required
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              value={ playerInfo.email }
              onChange={ changeInput }
            />
          </label>
          <Link to="/jogo">
            <input
              data-testid="btn-play"
              className="btn login-btn"
              type="button"
              onClick={ onClickButton }
              disabled={ btnStatus }
              value="Jogar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

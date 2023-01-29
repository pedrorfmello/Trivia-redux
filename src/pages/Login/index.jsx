import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import triviaLogo from '../../trivia.png';
import { loginUser } from '../../redux/actions/login';
import { emailValidation, nameValidation } from '../../helpers/validations';
import * as api from '../../helpers/api';
import './Login.css';
import { initiateRanking } from '../../helpers/localStorage';
import Footer from '../../components/Footer';

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

    // Verifica se o ranking está criado no localStorage
    initiateRanking();

    await api.getTriviaToken();
  };

  // Valida dos inputs para liberação do botão "Jogar"
  useEffect(() => {
    if (emailValidation(playerInfo.email) && nameValidation(playerInfo.playerName)) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [playerInfo]);

  // Atualiza os inputs com o state
  const changeInput = ({ target }) => {
    const { id, value } = target;
    setPlayerInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="login">
      <div className="login-body">
        <img src={ triviaLogo } className="Login-logo" alt="Logo Trivia" />
        <h2>Bem-vindo, insira suas informações para jogar.</h2>
        <div className="login-form form">
          <label htmlFor="playerName" className="login-form">
            Nome:
            {' '}
            <input
              required
              data-testid="input-player-name"
              className="form-control"
              id="playerName"
              type="playerName"
              value={ playerInfo.playerName }
              onChange={ changeInput }
            />
          </label>
          <label htmlFor="email" className="login-form">
            Email:
            {' '}
            <input
              required
              data-testid="input-gravatar-email"
              className="form-control"
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
        <div className="btns-content">
          <Link to="/configuracao">
            <button data-testid="btn-settings" className="btn btn-settings" type="button">
              Configuração
            </button>
          </Link>
          <Link to="/ranking">
            <button data-testid="btn-ranking" className="btn btn-ranking" type="button">
              Ranking
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

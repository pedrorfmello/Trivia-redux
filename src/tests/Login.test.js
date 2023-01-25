import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';

import {
  VALID_EMAIL,
  VALID_NAME,
  INVALID_EMAIL_0,
  INVALID_EMAIL_1,
  INVALID_EMAIL_2,
  INVALID_EMAIL_3,
  INVALID_NAME,
} from './helpers/constants';

describe('Teste page Login', () => {
  it('A rota para a página deve ser "/"', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    expect(history.location.pathname).toBe('/')
  })

  it('Deve existir o titulo "Bem-vindo, insira suas informações para jogar."', () => {
    renderWithRouterAndRedux(<Login />);
    const loginTitle = screen.getByRole('heading', { level: 2, name: 'Bem-vindo, insira suas informações para jogar.' });
    expect(loginTitle).toBeInTheDocument();
  })

  it('Deve existir local para que o jogador insira o nome e email', () => {
    renderWithRouterAndRedux(<Login />, '/');
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  })
  it('Deve existir um botão com o texto "Jogar"', () =>  {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByTestId("btn-play");
    expect(button).toBeInTheDocument();
  })
  it('Verifica se o botão "Jogar" fica habilitado apenas com nome e email válidos:', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const button = screen.getByTestId("btn-play");
    expect(button).toBeDisabled();

    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');

    userEvent.type(email, INVALID_EMAIL_0);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();


    userEvent.type(email, INVALID_EMAIL_1);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_2);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(name, INVALID_NAME);
    expect(button).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_3);
    userEvent.type(name, VALID_NAME);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(name, VALID_NAME);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/jogo');
  });
  it('A rota deve ser mudada para \'/game\' após o clique no botão "Jogar".', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId('input-gravatar-email');
    const senha = screen.getByTestId('input-player-name');
    const button = screen.getByTestId("btn-play");

    expect(button.disabled).toBe(true);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_NAME);
    
    userEvent.click(button);

    expect(history.location.pathname).toBe('/jogo');
  });
})
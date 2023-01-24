import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Store from './redux/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ Store }>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById('root'),
);

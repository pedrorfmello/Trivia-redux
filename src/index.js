import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import Store from './redux/store';

ReactDOM.render(
  <BrowserRouter>
    <HashRouter basename={ process.env.PUBLIC_URL }>
      <Provider store={ Store }>
        <App />
      </Provider>
    </HashRouter>
  </BrowserRouter>,

  document.getElementById('root'),
);

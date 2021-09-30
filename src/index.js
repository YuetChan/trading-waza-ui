import './index.css';
import App from './app';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import configureStore from './redux/tw-store';

import reportWebVitals from './reportWebVitals';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

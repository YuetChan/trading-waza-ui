import App from './app';
import configureStore from './tw-redux/store';
import reportWebVitals from './reportWebVitals';

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

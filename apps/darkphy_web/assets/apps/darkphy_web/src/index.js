// @flow weak
// src/index.js
import React from 'react';
import { render } from 'react-dom';
import AppRoutes from './AppRoutes';

import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('app');
window.onload = () => {
  render(
    <AppContainer
      errorReporter={({ error }) => {
        throw error;
      }}
    >
      <AppRoutes />
    </AppContainer>
    , rootEl);
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./AppRoutes', () => {
    const NextApp = require('./AppRoutes').default; // eslint-disable-line global-require

    render(
      <AppContainer
        errorReporter={({ error }) => {
          throw error;
        }}
      >
        <NextApp />
      </AppContainer>,
      rootEl,
    );
  });
}

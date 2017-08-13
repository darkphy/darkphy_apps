// @flow weak
// src/AppRoutes.js
import React from 'react';
import { Router } from 'react-router'

import history from './history';
import App from './App';


class BrowserRouter2 extends React.Component {
  render() {
    return <Router history={history} children={this.props.children}/>
  }
}

export default class AppRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter2 onUpdate={() => window.scrollTo(0, 0)}><App /></BrowserRouter2>
    );
  }
}

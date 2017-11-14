// @flow weak
// src/AppRoutes.js
import React from 'react';
import { Router } from 'react-router'

import history from './history';
import App from './App';

import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { JssProvider } from 'react-jss';
import jss  from 'jss';
import preset from 'jss-preset-default';


jss.setup(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'jss'


class BrowserRouter2 extends React.Component {
  render() {
    return <Router history={history} children={this.props.children}/>
  }
}

export default class AppRoutes extends React.Component {
  render() {
    return (
      <JssProvider jss={jss}>
        <BrowserRouter2 onUpdate={() => window.scrollTo(0, 0)}><App /></BrowserRouter2>
      </JssProvider>
    );
  }
}

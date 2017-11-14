import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';
import { Div } from 'material-son';

import { store } from 'shared/utils';

@inject('LangarStore','DarkErrorStore') @observer
class Home extends React.Component{
  componentDidMount(){
    console.log(localStorage.getItem("hulu"));
  }
  render(){
    return(
      <Div>
        Lets go speedman
      </Div>
    );
  }
}
export default Home

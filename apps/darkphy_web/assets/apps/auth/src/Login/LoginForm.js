import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { CircularProgress } from 'material-ui';
import { Div, Span, Button, AButton, Link, TextField } from 'material-son';
import SwipeableViews from 'react-swipeable-views';

import cx from 'classnames';
import { withApollo, gql } from 'react-apollo'

import legendcss from '../css/legend.css';
import { __RELAY_API_ENDPOINT__ } from '../shared/utils/constants.js';
import { queryGQL } from '../shared/graphql/xhr.js';
//import { withGraphQL } from 'react-apollo-decorators';

const swipeableHeight = '240px';
const TabContainer = props =>
  <Div style={{minHeight: swipeableHeight}}>
    {props.children}
  </Div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const CheckEmail = gql`
  query EmailCheck($email: String!) {
    checkEmail(email: $email) {
      id,
      name,
      pp,
      email,
    }
  }
`;
@withApollo
@inject('LangarStore','DarkErrorStore') @observer
class LoginForm extends React.Component{
  static propTypes = {
    handleChangeIndex: PropTypes.func.isRequired,
    setStateFromChild: PropTypes.func.isRequired,
  }
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      emailField: '',
      passwordField: '',
      loginSRC: 'https://cdn.discordapp.com/icons/301788644036050954/9ee2d59ab1c0cb881903da9995ad7ef4.png',
    };
  }
  render(){
    const { LangarStore } = this.props;
    const {
      index,
      emailField,
      passwordField,
      loginSRC,
    } = this.state;
    return(
    <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
        <TabContainer>
          <TextField
            styleName='mar-20-0'
            value={emailField}
            onChange={this.handleEmailField}
            label={LangarStore.getW("emailphone")}
            type="email"
            fullWidth />
            <Link faded to="/forgotemail">Forgot Email?</Link>
          <AButton
            styleName='pad-20 mar-20-0'
            onClick={this.checkEmail}
            color="primary"
            fullWidth
            pendingText={<CircularProgress size={14}/>}
            raised >
            {LangarStore.getW("next")}
          </AButton>
          <Div
            styleName='mar-20-0'
            >
            <Span styleName='hint'>Need an account? </Span>
            <Link onClick={()=>{ this.props.handleChangeIndex(1) }} to="/register">Register Now</Link>
          </Div>
        </TabContainer>
        <TabContainer>
          <TextField
            styleName='mar-20-0'
            value={passwordField}
            onChange={this.handlePasswordField}
            label={LangarStore.getW("pass")}
            InputProps={{ placeholder: LangarStore.getW("pass") }}
            type="password"
            fullWidth />
          <Link faded to="/forgot">Forgot password?</Link>
          <Button
            styleName='pad-20 mar-20-0'
            raised
            fullWidth
            color="primary"
          >
            {LangarStore.getW("sign_in")}
          </Button>
          <Div>
            <Span styleName='hint'>Missed Something? </Span>
            <Link onClick={()=>{ this.handleChangeIndex(0); }} to="/#">Go back</Link>
          </Div>
        </TabContainer>
      </SwipeableViews>
    );
  }
  checkEmail = () => {
    const { DarkErrorStore, LangarStore } = this.props;
    return queryGQL(this.props, CheckEmail, { "email": this.state.emailField },(res)=>{
      this.handleChangeIndex(1);
      this.props.setStateFromChild(res);
    });
  }
  handleEmailField = (e: object) => {
    this.setState({ emailField: e.target.value });
  }
  handlePasswordField = (e: object) => {
    this.setState({ passwordField: e.target.value });
  }
  handleChangeIndex = (index) => {
    this.setState({ index });
  }
}
export default LoginForm;

import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { CircularProgress } from 'material-ui';
import { Div, Span, Button, AButton, Link, TextField } from 'material-son';
import SwipeableViews from 'react-swipeable-views';

import cx from 'classnames';
import { withApollo, gql } from 'react-apollo'

import { saveToken } from 'shared/utils/auth.js';
import { queryGQL } from 'shared/graphql/xhr.js';
import legendcss from '../css/legend.css';

const swipeableHeight = '240px';
const TabContainer = props =>
  <Div style={{minHeight: swipeableHeight}}>
    {props.children}
  </Div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const EmailCheck = gql`
  query EmailCheck($email: String!) {
    checkEmail(email: $email) {
      id,
      name,
      pp,
      email,
    }
  }
`;

const SignIn = gql`
  query SignIn($email: String!, $password: String!) {
    oauth(email: $email, password: $password) {
      id,
      access_token,
      refresh_token,
    }
  }
`;
@withApollo
@inject('LoginStore','LangarStore','DarkErrorStore') @observer
class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      emailField: '',
      passwordField: '',
      loginSRC: 'https://cdn.discordapp.com/icons/301788644036050954/9ee2d59ab1c0cb881903da9995ad7ef4.png',
    };
  }
  componentDidMount(){
    const { currentHit } = this.props.LoginStore;
      if(currentHit && currentHit.name){
        this.setState({ emailField:  currentHit.email });
        this.handleChangeIndex(1);
      }
   }
  render(){
    const { LangarStore, LoginStore } = this.props;
    const {
      index,
      emailField,
      passwordField,
      loginSRC,
    } = this.state;
    return(
    <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
        <TabContainer>
          <form>
            <TextField
              styleName='mar-20-0'
              value={emailField}
              onChange={this.handleEmailField}
              label={LangarStore.getW("emailphone")}
              type="text"
              fullWidth />
              <Link faded to="/forgot">Forgot Email?</Link>
            <AButton
              onClick={this.handleCheckEmail}
              type="submit"
              styleName='pad-20 mar-20-0'
              color="primary"
              fullWidth
              raised >
              {LangarStore.getW("next")}
            </AButton>
          </form>
          <Div
            styleName='mar-20-0'
            >
            <Span styleName='hint'>Need an account? </Span>
            <Link onClick={()=>{ LoginStore.handleChangeIndex(1) }} to="/#join">Register Now</Link>
          </Div>
        </TabContainer>
        <TabContainer>
          <form>
            <TextField
              styleName='mar-20-0'
              value={passwordField}
              onChange={this.handlePasswordField}
              label={LangarStore.getW("pass")}
              InputProps={{ placeholder: LangarStore.getW("pass") }}
              type="password"
              fullWidth />
            <Link faded to="/forgot">Forgot password?</Link>
            <AButton
              onClick={this.handleSignIn}
              styleName='pad-20 mar-20-0'
              color="primary"
              type="submit"
              raised
              fullWidth >
            {LangarStore.getW("sign_in")}
          </AButton>
         </form>
          <Div>
            <Span styleName='hint'>Missed Something? </Span>
            <Link onClick={()=>{ LoginStore.setCurrentHit(null); this.handleChangeIndex(0); }} to="/#">Go back</Link>
          </Div>
        </TabContainer>
      </SwipeableViews>
    );
  }
  handleSignIn = () => {
    return queryGQL(this.props, SignIn, {
      email: this.state.emailField,
      password: this.state.passwordField,
     },(res)=>{
       const { access_token, refresh_token, id } = res;
       saveToken({ access_token, refresh_token });

       const user = Object.assign({},this.props.LoginStore.currentHit,{id, access_token, refresh_token});
       this.props.LoginStore.addUserList(user);

    });
  }
  handleCheckEmail = (e) => {
    e.preventDefault();
    const { DarkErrorStore, LangarStore, LoginStore } = this.props;
    return queryGQL(this.props, EmailCheck, {
      email: this.state.emailField,
    },(res)=>{
      this.handleChangeIndex(1);
      this.props.LoginStore.currentHit = {
        email: res.email,
        name: res.name,
        pp: res.pp,
      };
      LoginStore.setCurrentHit(res);
    });
  }
  handleEmailField = (e: object) => {
    this.setState({ emailField: e.target.value });
  }
  handlePasswordField = (e: object) => {
    if(e.keyCode == 13){
      this.handleSignIn();
      return false;
    }
    this.setState({ passwordField: e.target.value });
  }
  handleChangeIndex = (index) => {
    this.setState({ index });
  }
}
export default LoginForm;

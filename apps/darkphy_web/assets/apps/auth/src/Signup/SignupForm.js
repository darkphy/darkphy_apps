// @flow

import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
//import { TextField } from 'material-ui';
import { Div, Span, Link, AButton, TextField } from 'material-son';
import { withApollo, gql } from 'react-apollo'

import Recaptcha from 'react-google-invisible-recaptcha';

import { saveToken } from 'shared/utils/auth.js';
import { queryGQL } from 'shared/graphql/xhr.js';
import legendcss from '../css/legend.css';


/*eslint-disable */
const emailValidate = (val) => {
  var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(val);
}
/*eslint-enable */
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const SignUp = gql`
  query SignUp($name: String!) {
    join(name: $name) {
      id,
      name,
      pp,
      access_token,
      refresh_token,
    }
  }
`;

@withApollo
@inject('LangarStore','DarkErrorStore') @observer
class SignupForm extends React.Component{
  static propTypes = {
    handleChangeIndex: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      formEvent: null,
      captchaResponse: null,
      fullName: '',
    };
  }
  componentDidMount() {
    this.recaptcha.reset();
  }
  render (){

      const { LangarStore } = this.props;
      const { formEvent, captchaResponse, fullName, lastName }  = this.state;


      return (
        <form>
              <Div>
                  <TextField
                    fullWidth
                    styleName='mar-20-0'
                    label="Name"
                    value={fullName}
                    onChange={this.handleFullName} />
              </Div>
              <Recaptcha ref={ ref => this.recaptcha = ref } sitekey="6LeVrCIUAAAAABF7uxE3cBnqCZD7d-ZdtA2u9xLJ" onResolved={this.handleCaptchaResolved} />
            <Div>
              <Div styleName='hint mar-20-0'>{LangarStore.getW("agree_terms")}</Div>
              <AButton
                styleName='pad-20 mar-20-0'
                raised
                fullWidth
                color="primary"
                type="submit"
                onClick={this.onSignupFormSubmit}
                >
                Create Account
              </AButton>
              <Div>
                <Span styleName='hint'>Already member? </Span>
                <Link onClick={()=>{ this.props.handleChangeIndex(0); }} to="#login">Login</Link>
              </Div>
            </Div>
          </form>
      );
  }
  handleFullName = (e) => {
    this.setState({ fullName: e.target.value });
  }
  onSignupFormSubmit = (e) => {
    e.preventDefault();
    this.handleCaptchaResolved();
    //this.recaptcha.reset();
    //this.recaptcha.execute();
  }
  handleCaptchaResolved = () => {
    return new Promise((resolve, reject) => {
      this.setState({ captchaResponse : this.recaptcha.getResponse() });
      setTimeout(()=>{
        this.handleSignup({resolve, reject});

      },3000);
    });
  }
  handleSignup = ({resolve, reject}) => {
    return queryGQL(this.props, SignUp, {
      name: this.state.fullName,
     },(res)=>{
       const { access_token, refresh_token, id } = res;
       saveToken({access_token, refresh_token});
       const user = { id, name, pp, access_token, refresh_token };
       this.props.addUserList(user);
    });
    /*
    let self = this;
    const { fullName, captchaResponse } = this.state;

    axios
      .post('/api/v1/join',{
        fullName : fullName,
        captchaResponse : captchaResponse
      })
      .then((data) => {
          resolve();
          let res = ajaxTechnical(data);
          if(!res) return
          if(res.error){
            DarkErrorStore.activateError({code : res.error_code});
            return false;
          }
          localStorage.setItem("AUTH_CODE",res.token);
          localStorage.setItem("AUTH_REFRESH_CODE",res.refresh_token);
          localStorage.setItem("AUTH_EXPIRY",res.expiry);


          let profile = res.profile;
          StoreWrapper.save_user(profile);

          self.handleSignupSuccess(res);

          history.push("/quickstart");
      });
      */
  }
}
export default SignupForm;

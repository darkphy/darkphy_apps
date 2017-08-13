// @flow

import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
//import { TextField } from 'material-ui';
import { Div, Span, Link, Button, TextField } from 'material-son';

import Recaptcha from 'react-google-invisible-recaptcha';

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

@inject('LangarStore') @observer
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
  onSignupFormSubmit(e){

    e.preventDefault();
    this.recaptcha.reset();
    this.setFormEvent(e.target);
    this.recaptcha.execute();
  }
  render (){

      const { LangarStore } = this.props;
      const { formEvent, captchaResponse, fullName, lastName }  = this.state;


      return (
        <form onSubmit={(e)=>{ this.onSignupFormSubmit(e) }}>
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
              <Button
                styleName='pad-20 mar-20-0'
                raised
                fullWidth
                color="primary"
                type="submit">
                Create Account
              </Button>
              <Div>
                <Span styleName='hint'>Already member? </Span>
                <Link onClick={()=>{ this.props.handleChangeIndex(0); }} to="/login">Login</Link>
              </Div>
            </Div>
          </form>
      );
  }
  setFormEvent = (formEvent: Object) => {
    this.setState({ formEvent });
  }
  handleFullName = (e) => {
    this.setState({ fullName: e.target.value });
  }
  handleCaptchaResolved = () => {
    return new Promise((resolve, reject) => {
      this.setState({ captchaResponse : this.recaptcha.getResponse() });
      this.handleSignup({resolve, reject});
    });
  }
  handleSignup = ({resolve, reject}) => {
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

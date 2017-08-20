// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import _ from 'lodash';
import { Icon, List, Paper, Typography } from 'material-ui';
import { AButton, TextField, Link, FaDiv, Fa, Span, Div } from 'material-son';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import cx from 'classnames';

import { HASH, BG_URL } from 'shared/utils/constants.js';
import legendcss from '../css/legend.css';
import { styleSheet } from '../css/landingStyle.js';

const swipeableHeight = '100px';
const TabContainer = props =>
  <Div style={{ padding: 24, minHeight: swipeableHeight}}>
    {props.children}
  </Div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

@withStyles(styleSheet)
@inject('LangarStore') @observer
class Forgot extends React.Component {
  @observable index =  0;
  @observable emailField =  "";

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    document.body.style.backgroundImage = `url(${BG_URL})`;
    if(location.hash.substr(1) == HASH.pwd){
      this.handleChangeIndex(1);
    }
  }

  getHeader = () => {
    const { LangarStore } = this.props;
    const ret  = (<Typography type="headline">{LangarStore.getW("forgot_header")}</Typography>);
    return ret;
  }
  render() {
    const { LangarStore, classes } = this.props;
    const { emailField, index } = this;
    const H1 = this.getHeader();
    let out;
      out = (
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
          <TabContainer>
            {H1}
            <Typography
            styleName='pad-20-0'
            >You can also use your username to <Link to="/" >Login</Link>
            </Typography>
            <Link faded to="#pwd" onClick={()=>{ this.handleChangeIndex(1) }}>Forgot password instead?</Link>
          </TabContainer>
          <TabContainer>
            {H1}
            <form>
              <TextField
                styleName='mar-20-0'
                value={emailField}
                onChange={this.handleEmailField}
                label={LangarStore.getW("emailphone")}
                type="text"
                fullWidth />
                <Link to="#" onClick={()=>{ this.handleChangeIndex(0) }} >Forgot Email instead?</Link>
              <AButton
                onClick={this.handleForgotPassword}
                type="submit"
                styleName='pad-20 mar-20-0'
                color="primary"
                fullWidth
                raised >
                {LangarStore.getW("resend")}
              </AButton>
            </form>
          </TabContainer>
        </SwipeableViews>
      );
    return (
      <Div className={classes.root} >
        <Div className={cx(classes.center)} >
          <Div className={cx(classes.blur)} >
            <Div className={cx(classes.bg)} style={{backgroundImage: `url(${BG_URL})`}}></Div>
          </Div>
            <Paper className={cx(classes.paper)} >{out}</Paper>
          </Div>
        </Div>
    );
  }
  handleChangeIndex = (index) => {
    this.index = index;
  };
  handleEmailField = (e: object) => {
    this.emailField = e.target.value;
  };
  handleForgotPassword = (e: object) => {
  };
}
export default Forgot;

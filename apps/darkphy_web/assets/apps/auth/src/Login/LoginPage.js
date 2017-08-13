// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

import { Paper, Typography } from 'material-ui';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import { FaDiv, Fa, Span, Div } from 'material-son';
import SwipeableViews from 'react-swipeable-views';
import cx from 'classnames';

import { lstorages } from '../shared/utils';
import { SignupForm } from '../Signup';
import LoginForm from './LoginForm.js';
import { Avatar } from '../shared';

const swipeableHeight = '280px';
const TabContainer = props =>
  <Div style={{ padding: 24, minHeight: swipeableHeight}}>
    {props.children}
  </Div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  center: {
    flexShrink: 0,
    width: '450px',
    position: 'relative',
    padding: '20px',
  },
  paper: {
    background: 'rgba(60, 60, 61, 0.75)',
    position: 'relative',
    zIndex: 10,
  },
  blur: {
    filter: 'blur(10px)',
  },
  bg: {
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: '#2f3136',
    backgroundSize: 'cover',
    backgroundPosition: '50%',

    width: '100%',
    height: '100%',
    zIndex: '-1',
  }
}));

const bgURL = 'http://i.imgur.com/BQFAZTe.jpg?1';
@withStyles(styleSheet)
@inject('LangarStore') @observer
class LoginPage extends React.Component {
  @observable index =  0;
  @observable alien =  0;
  @observable currentHit =  null;


  constructor(props) {
    super(props);
  }
  componentDidMount(){
    lstorages.init();
    this.alien = lstorages.alien;

    document.body.style.backgroundImage = `url(${bgURL})`;
  }

  render() {
    const { LangarStore, classes } = this.props;
    const { alien, currentHit, index } = this;
    if(alien){
      return (
        <Div className={classes.root} >
          <Div className={cx(classes.center)} >
            <Div className={cx(classes.blur)} >
              <Div className={cx(classes.bg)} style={{backgroundImage: `url(${bgURL})`}}></Div>
            </Div>
            <Paper className={cx(classes.paper)} >
              <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
                <TabContainer>
                  {
                    <Div>
                      (currentHit) ?
                      <Div>
                        <Typography type="headline">
                          {`${LangarStore.getW("hi")}, ${currentHit.name.split(" ")[0]}`}
                        </Typography>
                      </Div>
                      <FaDiv>
                        <Fa><Avatar profile={currentHit} /></Fa>
                        <Fa>{currentHit.email}</Fa>
                      </FaDiv>
                    </Div>
                    : <Typography type="headline">{LangarStore.getW("sign_in")}</Typography>
                  }
                  </Typography>
                  <LoginForm handleChangeIndex={this.handleChangeIndex} setStateFromChild={this.setStateFromChild} />
                </TabContainer>
                <TabContainer>
                  <Typography type="headline">{LangarStore.getW("join")}</Typography>
                  <SignupForm handleChangeIndex={this.handleChangeIndex} />
                </TabContainer>
              </SwipeableViews>
            </Paper>
          </Div>
        </Div>
      );
    }
    return (null);
  }
  handleChangeIndex = (index) => {
    this.index = index;
  };
  setStateFromChild = (res) => {
    this.currentHit = res;
  };
}
export default LoginPage;

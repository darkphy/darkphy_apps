// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { Icon, List, Paper, Typography } from 'material-ui';
import { ListItem, ListItemText, FaDiv, Fa, Span, Div } from 'material-son';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import cx from 'classnames';

import { SignupForm } from '../Signup';
import LoginForm from './LoginForm.js';
import { Avatar } from 'shared';
import { AUTH_TOKEN, USER_LIST } from 'shared/utils/constants.js';
import legendcss from '../css/legend.css';

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
  },
  accountIcon: {
    backgroundColor: 'transparent',
  },
}));

const bgURL = 'http://i.imgur.com/BQFAZTe.jpg?1';
@withStyles(styleSheet)
@inject('LangarStore') @observer
class LoginPage extends React.Component {
  @observable index =  0;
  @observable alien =  true;
  @observable currentHit =  null;
  @observable userList = [];
  @observable forcedAlien = false;

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.alien = !localStorage.getItem(AUTH_TOKEN);
    document.body.style.backgroundImage = `url(${bgURL})`;
    const userList = localStorage.getItem(USER_LIST);
    //localStorage.clear();
    if(userList !== false && userList!==null && userList.length > 0){
      this.userList = JSON.parse(userList);
    }
    if(location.hash == 'join'){
      this.handleChangeIndex(1);
    }
  }

  getHeader = () => {
    const { LangarStore } = this.props;
    const { currentHit } = this;
    const ret =
    (currentHit !== null) ?
    (<Div>
      <Div>
        <Typography type="headline">
          {`${LangarStore.getW("hi")}, ${currentHit.name.split(" ")[0]}`}
        </Typography>
      </Div>
      <List>
        <ListItem>
          <Avatar profile={currentHit} />
          <ListItemText primary={currentHit.email} />
        </ListItem>
      </List>
    </Div>)
    : (<Typography type="headline">{LangarStore.getW("sign_in")}</Typography>);
    return ret;
  }
  render() {
    const { LangarStore, classes } = this.props;
    const { alien, forcedAlien, index, userList } = this;
    const H1 = this.getHeader();
    let out;
    if(forcedAlien || alien || userList === null || userList.length < 1){
      out = (
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
          <TabContainer>
            {H1}
            <LoginForm
            handleChangeIndex={this.handleChangeIndex}
            setCurrentHit={this.setCurrentHit}
            addUserList={this.addUserList}
             />
          </TabContainer>
          <TabContainer>
            <Typography type="headline">{LangarStore.getW("join")}</Typography>
            <SignupForm handleChangeIndex={this.handleChangeIndex} />
          </TabContainer>
        </SwipeableViews>
      );
    }else{
      out = (
        <Div>
          <Typography
          styleName='pad-20'
          type="headline">{LangarStore.getW("choose_account")}</Typography>
          <List
            styleName='pad-20-0'
          >
          {userList.map( (o,i) =>
            {
              return(
                <ListItem
                  key={i}
                  button >
                  <Avatar profile={o} />
                  <ListItemText
                    primary={o.name}
                    secondary={o.email}
                    />
                </ListItem>
              )
          }
          )}
          <ListItem
            key={userList.length+1}
            button
            onClick={()=>{
              this.forcedAlien = true;
              this.currentHit = null;
            }}
            >
            <Avatar
            className={classes.accountIcon}
            >
              <Icon color="contrast">account_circle</Icon>
            </Avatar>
            <ListItemText primary={LangarStore.getW("another_account")} />
          </ListItem>
          </List>
        </Div>
      );
    }
    return (
      <Div className={classes.root} >
        <Div className={cx(classes.center)} >
          <Div className={cx(classes.blur)} >
            <Div className={cx(classes.bg)} style={{backgroundImage: `url(${bgURL})`}}></Div>
          </Div>
            <Paper className={cx(classes.paper)} >{out}</Paper>
          </Div>
        </Div>
    );
  }
  handleChangeIndex = (index) => {
    this.index = index;
  };
  @action setCurrentHit = (res) => {
    this.currentHit = res;
  };
  @action addUserList = (user) => {
    const u = this.userList;
    u.push(user);
    this.userList = u;
    this.forcedAlien = false;
    localStorage.setItem(USER_LIST, JSON.stringify(this.userList));
  }
}
export default LoginPage;

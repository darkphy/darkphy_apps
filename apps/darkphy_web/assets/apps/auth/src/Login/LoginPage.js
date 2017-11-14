// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import _ from 'lodash';
import { Icon, List, Paper, Typography } from 'material-ui';
import { ListItem, ListItemText, FaDiv, Fa, Span, Div } from 'material-son';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import cx from 'classnames';

import { store } from 'shared/utils';
import { SignupForm } from '../Signup';
import LoginForm from './LoginForm.js';
import { Avatar } from 'shared';
import { AUTH_TOKEN, USER_LIST, BG_URL ,HASH } from 'shared/utils/constants.js';
import legendcss from '../css/legend.css';
import { styleSheet } from '../css/landingStyle.js';

const swipeableHeight = '280px';
const TabContainer = props =>
  <Div style={{ padding: 24, minHeight: swipeableHeight}}>
    {props.children}
  </Div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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
    const st = require('shared/utils').store;
    st.onConnect().then(()=>{
      console.log(st.get('hulu'));
    });

    this.alien = !store.get(AUTH_TOKEN);
    document.body.style.backgroundImage = `url(${BG_URL})`;
    const userList = store.get(USER_LIST);
    //localStorage.clear();
    if(userList !== false && userList!==null && userList.length > 0){
      this.userList = JSON.parse(userList);
    }

    if(location.hash.substr(1) == HASH.join){
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
            <SignupForm
              handleChangeIndex={this.handleChangeIndex}
              addUserList={this.addUserList}
             />
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
  @action setCurrentHit = (res) => {
    this.currentHit = res;
  };
  @action addUserList = (user) => {
    const u = this.userList;
    u.unshift(user);
    _.uniqBy(u,'id');
    this.userList = u;
    this.forcedAlien = false;
    store.set(USER_LIST, JSON.stringify(this.userList));
  }
}
export default LoginPage;

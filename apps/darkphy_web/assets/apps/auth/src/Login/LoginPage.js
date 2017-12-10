// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
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
@inject('LangarStore','LoginStore') @observer
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const { LoginStore } = this.props;
    
    LoginStore.alien = !localStorage.getItem(AUTH_TOKEN);
    document.body.style.backgroundImage = `url(${BG_URL})`;
    const userList = localStorage.getItem(USER_LIST);
    if(userList !== false && userList!==null && userList.length > 0){
      LoginStore.setValue("userList",JSON.parse(userList));
    }

    if(location.hash.substr(1) == HASH.join){
      LoginStore.handleChangeIndex(1);
    }
  }

  getHeader = () => {
    const { LangarStore, LoginStore } = this.props;
    const { currentHit } = LoginStore;
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
    const { LangarStore, LoginStore, classes } = this.props;
    const { alien, forcedAlien, index, userList } = LoginStore;
    const H1 = this.getHeader();
    let out;
    if(forcedAlien || alien || userList === null || userList.length < 1){
      out = (
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} animateHeight={true}>
          <TabContainer>
            {H1}
            <LoginForm />
          </TabContainer>
          <TabContainer>
            <Typography type="headline">{LangarStore.getW("join")}</Typography>
            <SignupForm />
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
                  button 
                  onClick={()=>{
                    LoginStore.setValue("currentHit", o);
                    LoginStore.setValue("forcedAlien", true);
                  }}
                  >
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
              LoginStore.setValue("forcedAlien", true);
              LoginStore.setValue("currentHit", null);
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
}

export default LoginPage;

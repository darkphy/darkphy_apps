// @flow we

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import cx from 'classnames';
import { Provider } from 'mobx-react';

import DevTools from 'mobx-react-devtools'; //only dev

import { DarkError, DarkErrorStore } from './shared';
import Login from './Login';

import { createStyleSheet, withStyles } from 'material-ui/styles';


const MainRoutes = () => (
  <main>
      <Switch>
        <Route path="/" component={Login} />
        <Route exact path="/" component={() => {return (<div></div>); }} />
      </Switch>
  </main>
);



const rootClass = "app-container";

const styleSheet = createStyleSheet('AppMain',{
  overlay: {},
  dark_visible: {
    '& $overlay': {
      animation: '.15s growDarkOverlay',
      transition: '.25s transform',
    },
  },
  dark_invisible: {
    '& $overlay': {
      transition: '.25s transform',
    },
  },
  app_container: {
    '&$dark_invisible': {
      '& $overlay': {
        transform: 'scale(0)',
      }
    },
    '&$dark_visible': {
      '& $overlay': {
        transform: 'scale(1)',
        background: 'rgba(0,0,0,.3)',
      }
    },
  },
});
let DStore;
@withStyles(styleSheet)
class AppMain extends React.Component {
  constructor(props){
    super(props);
    const { classes } = props;
    DStore = new DarkErrorStore({
      visibleClass: classes.dark_visible,
      inVisibleClass: classes.dark_invisible,
      rootClass: classes.app_container,
    });
  }
  render() {
    const { classes, theme, Atmosphere, stores } = this.props;
    return (
      <Provider {...stores} DarkErrorStore={DStore} >
          <div
              className={cx(
                classes.app_container,
                {DARK_THEME: theme === 0},
                {LIGHT_THEME: theme === 1},
              )}>
                <Atmosphere>
                  <MainRoutes />
                </Atmosphere>
                <DarkError overlayClassName={classes.overlay} />
                <DevTools />
          </div>
        </Provider>
    );
  }
}
export default AppMain;
// @flow we

import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';

import { MuiThemeProvider, createPalette, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { JssProvider } from 'react-jss';
import jss  from 'jss';
import preset from 'jss-preset-default';


import { darkPrimary } from 'shared/utils/styles.js';
import AppStore from './AppStore';
import { LangarStore } from 'shared';

import Atmosphere from 'shared/graphql/Atmosphere.js';
import AppMain from './AppMain';

const stores = {
  AppStore,
  LangarStore,
}


jss.setup(preset())
//jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'jss'


@withRouter
@observer
class App extends React.Component {
  constructor(props){
    super(props);

    const theme = createMuiTheme({
      palette: createPalette({
        type: (AppStore.theme == 0) ? 'dark' : 'light',
        primary: darkPrimary
      }),
    });
    this.theme = theme;
  }
  render() {
    return (
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={this.theme}>
          <AppMain
            theme={AppStore.theme}
            Atmosphere={Atmosphere}
            stores={stores}
          />
      </MuiThemeProvider>
    </JssProvider>
    );
  }
}
export default App;

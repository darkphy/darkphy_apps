// @flow we

import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';

import { MuiThemeProvider, createPalette, createMuiTheme } from 'material-ui/styles';

import { darkPrimary } from 'shared/utils/styles.js';
import AppStore from './AppStore';
import { LangarStore } from 'shared';

import Atmosphere from 'shared/graphql/Atmosphere.js';
import AppMain from './AppMain';

import {CrossStorageHub} from 'cross-storage';
const origin = 'darkphy.dev:4000';

const stores = {
  AppStore,
  LangarStore,
}

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
  componentDidMount(){
    CrossStorageHub.init([
       {origin: origin, allow: ['get', 'set', 'del']}
     ]);
  }
  render() {
    return (
        <MuiThemeProvider theme={this.theme}>
          <AppMain
            theme={AppStore.theme}
            Atmosphere={Atmosphere}
            stores={stores}
          />
      </MuiThemeProvider>
    );
  }
}
export default App;

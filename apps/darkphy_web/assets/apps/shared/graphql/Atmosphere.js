import React from 'npmmod/react';
import { __RELAY_API_ENDPOINT__ } from '../utils/constants.js';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'npmmod/react-apollo'
import { AUTH_TOKEN } from '../utils/constants.js';
import { store } from '../utils';
const networkInterface = createNetworkInterface({
  uri: __RELAY_API_ENDPOINT__,
  opts: {
    credentials: 'include',
  },
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = store.get('AUTH_TOKEN');
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

// 3
const client = new ApolloClient({
  networkInterface
})
class Atmosphere extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ApolloProvider client={client}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}
export default Atmosphere;

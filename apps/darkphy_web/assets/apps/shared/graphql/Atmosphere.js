import React from 'react';
import { __RELAY_API_ENDPOINT__ } from '../utils/constants.js';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'

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
    const token = localStorage.getItem('AUTH_TOKEN');
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

/*
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import stableJSONStringify from 'relay-runtime/lib/stableJSONStringify';

class Atmosphere extends Environment{
  static getKey = (name, variables) => {
    return stableJSONStringify({name, variables});
  };
  printError = (errors) => {
    this.DarkErrorStore.activateError({code : errors.error_code});
  };
  constructor({DarkErrorStore} = {}) {
    // run Environment
    //this.DarkErrorStore = obj;

    const store = new Store(new RecordSource());
    super({store});
    this._network = Network.create(this.fetchHTTP);

    // run atmosphere
    this.index = 0;
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.socket = undefined;
    this.networks = {
      http: this._network,
      socket: Network.create(this.fetchWS, this.socketSubscribe)
    };

    this.subLookup = {};
    this.querySubscriptions = [];
  }


  fetchHTTP = async (operation, variables) => {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
         Authorization: `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    });
    const resJson = res.json();
    const { errors} = resJson;
    if (!errors) return resJson;
    //const errorObj = makeErrorObj(errors);
    this.printError(errors);
    return Promise.reject(errors);
  };


  fetchWS = async (operation, variables) => {
    return new Promise((resolve, reject) => {
      this.socket.emit('graphql', {query: operation.text, variables}, (_, response) => {
        const {errors} = response;
        if (errors) {
          this.printError(errors)
          //const errorObj = makeErrorObj(errors);
          reject(errors);
        } else {
          // setTimeout(() => resolve(response), 2000);
          resolve(response);
        }
      });
    });
  };

  socketSubscribe = (operation, variables, cacheConfig, observer) => {
     const {name, text} = operation;
     const subKey = Atmosphere.getKey(name, variables);
     const {opId} = this.subLookup[subKey];
     if (!subKey) {
       throw new Error(`No subKey found for ${name} ${variables}`);
     }
     this.socket.on(`gqlData.${opId}`, (gqlResponse) => {
       if (gqlResponse) {
         observer.onNext(gqlResponse);
       } else {
         // the server kicked us out
         this.socketUnsubscribe(subKey, true);
         // the sub might wanna pop a toast or do something fancy
         if (observer.onCompleted) {
           observer.onCompleted();
         }
       }
     });
     this.socket.emit('gqlSub', {
       query: text,
       variables,
       opId
     });
   };

   ensureSubscription = (config) => {
     const {subscription, variables} = config;
     const {name} = subscription();
     const subKey = Atmosphere.getKey(name, variables);
     const opManager = this.subLookup[subKey];
     if (opManager === undefined) {
       this.subLookup[subKey] = {
         opId: this.index++
       };
       requestSubscription(this, config);
     } else {
       // another component cares about this subscription. if it tries to unsub, don't do it until both want to
       opManager.instances++;
     }
     return subKey;
   };

   safeSocketUnsubscribe = (subKey) => {
     // if this is the only query that cares about that sub, unsubscribe
     const queriesForSub = this.querySubscriptions.filter((qs) => qs.subKey === subKey);
     // the subLookup will be empty if this was a kickout
     if (queriesForSub.length === 1 && this.subLookup[subKey]) {
       this.socketUnsubscribe(subKey);
     }
   };

   socketUnsubscribe = (subKey, isKickout) => {
     const opManager = this.subLookup[subKey];
     if (!opManager) {
       throw new Error(`${subKey} does not exist. socketUnsubscribe was probably already called.`);
     }
     const {opId} = opManager;
     this.socket.off(`gqlData.${opId}`);
     delete this.subLookup[subKey];
     if (isKickout) {
       this.querySubscriptions.forEach((querySub) => {
         if (querySub.subKey === subKey) {
           querySub.handleKickout();
         }
       });
     } else {
       this.socket.emit('gqlUnsub', opId);
     }
   };
}

export default new Atmosphere;
*/

/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type LoginForm_LoginProp = {|
  +lookupEmail: ?{|
    +id: ?string;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "email",
      "type": "String!"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "LoginForm_LoginProp",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "email",
          "variableName": "email",
          "type": "String!"
        }
      ],
      "concreteType": "UserCredentials",
      "name": "lookupEmail",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RootQueryType"
};

module.exports = fragment;

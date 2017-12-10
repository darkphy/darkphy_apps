import React from  'react';
import { gup, _URL_ } from 'shared/utils/constants.js';
import { saveToken } from 'shared/utils/auth.js';
import { inject, observer } from 'mobx-react';
import { withApollo, gql } from 'react-apollo'
import { queryGQL } from 'shared/graphql/xhr.js';


const UserDetails = gql`
  query UserDetails($id: Integer!) {
    userDetails(id: $id) {
      id,
      name,
      pp,
      email,
    }
  }
`;


@withApollo
@inject('AppStore','LangarStore','DarkErrorStore') @observer
class TokenSave extends React.Component{
	componentDidMount(){
		const location = window.location.href;
		const access_token = gup("access_token", location);
		const refresh_token = gup("refresh_token", location);
		const id = gup("id", location);
		saveToken({ access_token, refresh_token });
		this.props.AppStore.id = id;
		this.getUserDetails(id);
		//document.location = _URL_;
	}
	getUserDetails = (id) => {
	     	console.log(UserDetails)
	     	console.log(id)
	    return queryGQL(this.props, UserDetails, {
	      id,
	     },(res)=>{
	     	console.log(res)
	       //this.props.LoginStore.addUserList(user);
	    });
	}
	render(){
		return(null);
	}
}

export default TokenSave;
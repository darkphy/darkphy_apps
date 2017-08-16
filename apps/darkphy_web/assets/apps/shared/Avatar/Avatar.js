import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';

class AvatarX extends React.Component{
  static PropTypes = {
    profile: PropTypes.object,
  }
  static defaultProps = {
    profile: undefined,
  }
  constructor(props){
    super(props);
  }
  render(){
    const { profile, ...other } = this.props;
    if(profile !== undefined){
      return( <Avatar alt={profile.name} src={profile.pp} {...other} /> );
    }else{
      return( <Avatar {...other} /> );
    }
  }
}

export default AvatarX;

import React from 'react';
import { Avatar } from 'material-ui';

class AvatarX extends React.Component{
  render(){
    const { profile } = props;
    return(
      <Avatar alt={profile.name} src={profile.pp} />
    );
  }
}

export default AvatarX;

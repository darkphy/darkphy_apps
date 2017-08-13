import React from 'react';
import { Avatar } from 'material-ui';

export const Avatar = (props) => {
  const { profile } = props;
  render(){
    return(
      <Avatar alt={profile.name} src={profile.pp} />
    );
  }
}

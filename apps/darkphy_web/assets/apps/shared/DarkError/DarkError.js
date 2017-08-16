// @flow
import React from 'npmmod/react';
import { observer, inject } from 'npmmod/mobx-react';
import PropTypes from 'npmmod/prop-types';

import { Icon } from 'npmmod/material-ui';
import { FaDiv, Div, Button } from 'npmmod/material-son';
import { createStyleSheet, withStyles } from 'npmmod/material-ui/styles';
import cx from 'npmmod/classnames';

const styleSheet = createStyleSheet({
  icon: {
    fontSize: '65px',
    color: '#98a9b4'
  },
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
		zIndex: '150',
		transform: 'scale(0)',
		animation: '.15s transform',
  },
  root: {
    background: '#FFF',
    textAlign: 'center',
    padding: '60px 25px 25px 25px',
    borderRadius: '6px',
    position: 'relative',
    width: '369px',
  },
  '@keyframes growDarkOverlay': {
  	from: {
  		transform: 'scale(0)',
  	},
  	to: {
  		transform: 'scale(1)',
  		background: 'rgba(0,0,0,.3)',
  	},
  },
  iconRoot:{
    position: 'absolute',
    top: '-30px',
    background: '#fff',
    padding: '10px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    borderRadius: '50%',
  },
  title: {
    fontWeight: '700',
    fontSize: '24px',
    color: '#535559',
  },
  description: {
    marginTop: '14px',
    marginBottom: '0',
    fontWeight: '300',
    lineHeight: '28px',
    fontSize: '18px',
    color: '#96a6b1',
    wordWrap: 'break-word',
  },
  controls: {
  	marginTop: '28px',
  },

})

@withStyles(styleSheet)
@inject('DarkErrorStore','LangarStore') @observer
class DarkError extends React.Component{
  static propTypes = {
    DarkErrorStore: PropTypes.object.isRequired,
    overlayClassName: PropTypes.string,
  }
  static defaultProps = {
    overlayClassName: ""
  }
  constructor(props) {
    super(props);
  }
  handleContainerClick(e){
    e.stopPropagation();
  }
  parseErrorCode(){
    const {DarkErrorStore,LangarStore} = this.props;
    if(DarkErrorStore.errorCode > -1 && DarkErrorStore.errorActive){
      DarkErrorStore.setErrorParams(LangarStore.getE(DarkErrorStore.errorCode));
    }
  }
  render() {
    const { DarkErrorStore, classes, overlayClassName } = this.props;
    if(DarkErrorStore.errorActive){
      let errorIcon = "";
      if(DarkErrorStore.errorIcon){
          errorIcon = (
          <Div className={classes.iconRoot}>
            <Icon className={classes.icon} >{DarkErrorStore.errorIcon}</Icon>
          </Div>
        );
      }
      return (
          <FaDiv hcenter vcenter className={cx(classes.overlay, overlayClassName)} onClick={()=>{DarkErrorStore.deactivateError()}} >
            <Div className={cx(classes.root)} onClick={this.handleContainerClick}>
              {errorIcon}
              <Div className={cx(classes.content)}>
                  <Div className={cx(classes.title)}>
                    {DarkErrorStore.errorTitle}
                  </Div>
                  <Div className={cx(classes.description)}>
                    {DarkErrorStore.errorDescription}
                  </Div>
              </Div>
              <Div className={cx(classes.controls)}>
                <Button
                  raised
                  color="primary"
                  fullWidth={true}
                  onClick={DarkErrorStore.deactivateError}>
                    {DarkErrorStore.errorLabel}
                </Button>
              </Div>
            </Div>
          </FaDiv>
      );
    }else{
      return (<Div></Div>);
    }
  }
}
/*
backgroundColor={materialStyle.cancelGrayButtonBackground} style={materialStyle.cancelGrayButton}
labelColor={materialStyle.cancelGrayButtonLabel}
*/
export default DarkError;

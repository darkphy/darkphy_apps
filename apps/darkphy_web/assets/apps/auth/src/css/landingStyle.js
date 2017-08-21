export const styleSheet = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  center: {
    flexShrink: 0,
    width: '450px',
    position: 'relative',
    padding: '20px',
  },
  paper: {
    background: 'rgba(60, 60, 61, 0.75)',
    position: 'relative',
    zIndex: 10,
    padding: '70px 30px 30px',
  },
  blur: {
    filter: 'blur(10px)',
  },
  bg: {
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: '#2f3136',
    backgroundSize: 'cover',
    backgroundPosition: '50%',

    width: '100%',
    height: '100%',
    zIndex: '-1',
  },
  accountIcon: {
    backgroundColor: 'transparent',
  },
});

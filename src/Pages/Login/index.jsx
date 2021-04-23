/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../components/CopyRight';
import background from '../../Assets/bg-login.jpg';
import * as actions from '../../Redux/Actions/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '91vh',
  },
  image: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '250px',
  },
  Copyright: {
    paddingTop: '600px',
    textAlign: 'center',
  },
}));

const ShowList = ({ Auth, getAccounts }) => {
  const classes = useStyles();

  const handleChooseAccount = () => {
    console.log('redirecting to', Auth.data)
    window.location.replace(Auth.data)
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={6} md={6} className={classes.image}>
        <div style={{
          position: 'absolute', top: '45%', left: '5%', right:'5%', fontSize: '40px',
        }}
        >
          Login and Choose Account to view Contacts
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Button variant="outlined" color="primary" onClick={handleChooseAccount}>
            Login Uisng Google
          </Button>
          <br />
          <Copyright />
        </div>
      </Grid>
    </Grid>
  );
};

export default connect(
  ({ Auth }) => ({
    Auth,
  }),
  {
    getAccounts: actions.getAccounts,
  },
)(ShowList);

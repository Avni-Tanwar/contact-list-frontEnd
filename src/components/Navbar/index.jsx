/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import ContactsIcon from '@material-ui/icons/Contacts';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  contactButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = ({ Auth, handleSearch }) => {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  console.log('navbar profile', Auth);

  useEffect(() => {
    if (Auth.value) {
      console.log('Auth navbar', Auth.value.data.id);
      setLoggedIn(true);
    }
  }, [Auth]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.contactButton}
            color="inherit"
          >
            <ContactsIcon />
          </IconButton>

          {loggedIn && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(event) => {
                  handleSearch(event);
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div>
            <IconButton
              edge="end"
              color="default"
            >
              <Link to="/contact-list" style={{ color: 'white' }}>List</Link>
            </IconButton>
          </div>

          <div>
            <IconButton
              edge="end"
              color="default"
            >
              {loggedIn ? <Link to="/logout" style={{ color: 'white' }}>Logout </Link> : <Link to="/login" style={{ color: 'white' }}>Login </Link> }
            </IconButton>
          </div>
          <div className={classes.sectionDesktop} style={{ margin: '20px' }}>
            {loggedIn ? <Avatar src={Auth?.value?.data?.picture} /> : ''}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(
  ({ Auth }) => ({
    Auth,
  }),
)(Navbar);

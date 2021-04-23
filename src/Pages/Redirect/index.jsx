/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import ContactList from '../ContactList';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/Auth';

const Redirect = ({ history, location, Auth, getLoginTokens }) => {
  useEffect(() => {
    const code = location.search.substring(1).split('&')[0];
    console.log('code after trim', code.substring(5));
    console.log('auth', Auth)
    getLoginTokens(code.substring(5))
    console.log('history and location', history, location);
}, [location]);

  return (
  <>
    <section>Loading contacts .....</section> 
    <ContactList search={null} />
  </>
  );
};

const Auth = withRouter(Redirect);

export default connect(
  ({ Auth }) => ({
    Auth,
  }),
  {
    getLoginTokens: actions.getLoginTokens,
  },
)(Auth);

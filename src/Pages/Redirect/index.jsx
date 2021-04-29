/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/Auth';

const MiddleWare = ({ location, Auth, getLoginTokens, getNewToken }) => {
  useEffect(() => {
    // localStorage.getItem('accessToken', );
    const code = location.search.substring(1).split('&')[0];
    if (code) {
      getLoginTokens(code.substring(5));
    }
  }, []);

  return (
    <>
       <Redirect to='/contact-list' />
    </>
  );
};

const Auth = withRouter(MiddleWare);

export default connect(
  ({ Auth }) => ({
    Auth,
  }),
  {
    getLoginTokens: actions.getLoginTokens,
    getNewToken: actions.getNewToken,
  },
)(Auth);

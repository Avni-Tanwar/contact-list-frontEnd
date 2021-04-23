/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import ContactList from '../ContactList';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/Auth';

const Redirect = ({ location, Auth, getLoginTokens, getNewToken }) => {
  useEffect(() => {
    const code = location.search.substring(1).split('&')[0];
    getLoginTokens(code.substring(5))
    const id = Auth.value.data.id;
    const uuid = Auth.value.data.uuid;
    if(id) {
      getNewToken(uuid);
    }
}, [Auth]);

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
    getNewToken: actions.getNewToken,
  },
)(Auth);

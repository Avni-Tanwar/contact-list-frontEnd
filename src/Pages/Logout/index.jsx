/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/Auth';

const Logout = ({ Auth, removeProfile }) => {
  useEffect(() => {
    const uuid = Auth?.value?.data?.uuid;
    removeProfile(uuid);
  }, []);

  return (
    <>
      <Redirect to='/' />
    </>
    );
};

export default connect(
  ({ Auth }) => ({
    Auth,
  }),
  {
    removeProfile: actions.removeProfile,
  },
)(Logout);

import React from 'react';
import { connect } from 'react-redux';
import Login from './login';
import { login } from '../../actions/session';

const mapState = state => {
  return {
    errors: state.errors.sessionErrors,
  };
};

const mapDispatch = dispatch => {
  return {
    action: user => dispatch(login(user))
  };
};

export default connect(mapState,mapDispatch)(Login);

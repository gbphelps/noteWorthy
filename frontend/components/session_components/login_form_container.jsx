import React from 'react';
import { connect } from 'react-redux';
import Login from './login';
import { login, lookup, clearErrors } from '../../actions/session';

const mapState = state => {
  return {
    errors: state.errors.sessionErrors,
  };
};

const mapDispatch = dispatch => {
  return {
    action: user => dispatch(login(user)),
    lookup: identifier => dispatch(lookup(identifier)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapState,mapDispatch)(Login);

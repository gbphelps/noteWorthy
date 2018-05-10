import React from 'react';
import { connect } from 'react-redux';
import Signup from './signup';
import { signup, clearErrors } from '../../actions/session';

const mapState = state => {
  return {
    errors: state.errors.sessionErrors,
  };
};

const mapDispatch = dispatch => {
  return {
    action: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapState,mapDispatch)(Signup);

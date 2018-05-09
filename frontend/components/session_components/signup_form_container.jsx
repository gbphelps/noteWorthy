import React from 'react';
import { connect } from 'react-redux';
import Signup from './signup';
import { signup } from '../../actions/session';

const mapState = state => {
  console.log(state.errors.sessionErrors);
  return {
    errors: state.errors.sessionErrors,
  };
};

const mapDispatch = dispatch => {
  return {
    action: user => dispatch(signup(user))
  };
};

export default connect(mapState,mapDispatch)(Signup);

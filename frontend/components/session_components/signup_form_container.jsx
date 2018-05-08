import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session';

const mapState = state => {
  console.log(state.errors.sessionErrors);
  return {
    errors: state.errors.sessionErrors,
    formType: 'Sign Up'
  };
};

const mapDispatch = dispatch => {
  return {
    action: user => dispatch(signup(user))
  };
};

export default connect(mapState,mapDispatch)(SessionForm);

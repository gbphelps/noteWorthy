import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session';

const mapState = state => {
  return {
    errors: state.errors.sessionErrors,
    formType: 'Log In'
  };
};

const mapDispatch = dispatch => {
  return {
    action: user => dispatch(login(user))
  };
};

export default connect(mapState,mapDispatch)(SessionForm);

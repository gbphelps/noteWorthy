import * as Api from '../utils/session';



export const RECEIVE_USER = 'RECEIVE_USER';
export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors
  };
};



export const login = user => dispatch => {
  return Api.login(user)
    .then(user => dispatch(receiveUser(user)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
  ;
};

export const logout = () => dispatch => {
  return Api.logout()
    .then(() => dispatch(logoutUser()))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const signup = user => dispatch => {
  return Api.signup(user)
    .then(user=> dispatch(receiveUser(user)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)));
};

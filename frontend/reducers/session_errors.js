import RECEIVE_ERRORS from '../actions/session'

export const sessionErrors = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return {};
  }
};

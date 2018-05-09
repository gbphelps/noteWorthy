import { RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/session';

export const sessionErrors = (state = [], action) => {
  switch(action.type){
    case RECEIVE_ERRORS:
      return action.errors;
    case CLEAR_ERRORS:
      return [];
    default:
      return [];
  }
};

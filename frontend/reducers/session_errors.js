import { RECEIVE_ERRORS } from '../actions/session';

export const sessionErrors = (state = [], action) => {
  switch(action.type){
    case RECEIVE_ERRORS:
      console.log('Entered');
      return action.errors;
    default:
      return [];
  }
};

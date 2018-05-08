import { LOGOUT_USER, RECEIVE_USER } from '../actions/session';


export const session = (state = {}, action) => {
  switch(action.type){
    case LOGOUT_USER:
      return {};
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
};

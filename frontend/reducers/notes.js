import { RECEIVE_NOTES, RECEIVE_NOTE, REMOVE_NOTE } from '../actions/notes';
import merge from 'lodash/merge'

const notesReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_NOTES:
      return action.notes ?
        action.notes :
        {};
    case RECEIVE_NOTE:
      return merge({},state,{[action.note.id]: action.note});
    case REMOVE_NOTE:
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    default:
      return state;
  }
};

export default notesReducer;

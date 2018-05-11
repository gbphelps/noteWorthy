import { RECEIVE_NOTE } from '../actions/notes'

export const currentNote = (state = null, action){
  switch(action.type){
    case RECEIVE_NOTE:
      return action.note.id;
    default:
      return state;
  }
};

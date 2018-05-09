import { RECEIVE_NOTES } from '../actions/notes';

const notesReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_NOTES:
      return action.notes;
    default:
      return state;
  }
};

export default notesReducer;

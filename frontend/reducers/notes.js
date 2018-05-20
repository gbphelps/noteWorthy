import { RECEIVE_NOTES, RECEIVE_NOTE, REMOVE_NOTE, CLEAR_NOTES } from '../actions/notes';
import merge from 'lodash/merge'

const notesReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_NOTES:
      return action.notes
    case RECEIVE_NOTE:
      ///TODO: do not add to notebook notes state if note in notebook?
      //would require an 'activeNote' slice of state in addition to 'notes'
      //Otherwise you can verify that the note is in the notebook indicated by match.params
      //before adding it to the list within the notes pane component. That might make
      //more sense.
      return merge({},state,{[action.payload.note.id]: action.payload.note});
    case REMOVE_NOTE:
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    case CLEAR_NOTES:
      return {};
    default:
      return state;
  }
};

export default notesReducer;

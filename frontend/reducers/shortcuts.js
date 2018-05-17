import { RECEIVE_SHORTCUTS } from '../actions/notes'

const shortcutsReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_SHORTCUTS:
      return action.notes;
    default:
      return state;
  }
}

export default shortcutsReducer;

import { RECEIVE_NOTE } from '../actions/notes'
import { RECEIVE_TAGGING, REMOVE_TAGGING } from '../actions/taggings'
import merge from 'lodash/merge'

const taggingsReducer = (state = {}, action) => {
  switch(action.type){
    //TODO
    case RECEIVE_TAGGING:
      return merge({}, state, {[action.tagging.tag_id]: action.tagging.id})
    case REMOVE_TAGGING:
      const id = action.tagging.tag_id;
      const next = merge({}, state);
      delete next[id];
      return next;
    case RECEIVE_NOTE:
      return action.payload.taggings;
    default:
      return state;
  }
}

export default taggingsReducer;

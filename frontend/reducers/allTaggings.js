import { RECEIVE_TAGGINGS } from '../actions/taggings';
import { REMOVE_NOTE } from '../actions/notes';
import values from 'lodash/values';
import merge from 'lodash/merge';

const allTaggingsReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_TAGGINGS:
      return action.taggings;
    case REMOVE_NOTE:
      const prev = merge({},state);
      const tags = values(prev);
      tags.forEach(tag => {
        //TODO think of better time complexity.
        if (tag.note_id === action.id) delete prev[tag.id];
      })
      return prev;
    default:
      return state;
  }
}

export default allTaggingsReducer;

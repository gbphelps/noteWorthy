import { RECEIVE_TAGGINGS } from '../actions/taggings';
//import { REMOVE_NOTE } from '../actions/notes';
import values from 'lodash/values';

const allTaggingsReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_TAGGINGS:
      return action.taggings;
    default:
      return state;
  }
}

export default allTaggingsReducer;

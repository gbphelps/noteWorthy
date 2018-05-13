import { RECEIVE_TAG, RECEIVE_TAGS, REMOVE_TAG } from '../actions/tags';

const tagsReducer = (state = {}, action) => {
  switch (action.type){
    case RECEIVE_TAGS:
      return action.tags;
    case RECEIVE_TAG:
      return merge({},state,{[action.tag.id]: action.tag});
    case REMOVE_TAG:
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    default:
      return state;
  }
};

export default tagsReducer;

import { RECEIVE_NOTE } from '../actions/notes'

const taggingsReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_NOTE:
      if (!action.payload.taggings) return {};
      return action.payload.taggings;
    default:
      return state;
  }
}

export default taggingsReducer;

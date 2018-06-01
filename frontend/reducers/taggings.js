import { RECEIVE_NOTE } from '../actions/notes'
//import { RECEIVE_TAGGING } from '../actions/taggings'

const taggingsReducer = (state = {}, action) => {
  switch(action.type){
    //case RECEIVE_TAGGING:
    case RECEIVE_NOTE:
      return action.payload.taggings;
    default:
      return state;
  }
}

export default taggingsReducer;

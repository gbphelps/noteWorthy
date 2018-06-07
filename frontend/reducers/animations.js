
import { ANIMATE_IN, ANIMATE_OUT, CLEAR_ANIMATION } from '../actions/notes'
import merge from 'lodash/merge'

const animationsReducer = (state={},action) =>{
  switch(action.type){
    case ANIMATE_IN:
      return {[action.id]: 'note-enter'};
    case ANIMATE_OUT:
        return {[action.id]: 'note-leave'};
    case CLEAR_ANIMATION:
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    default:
      return state;
  }
}

export default animationsReducer

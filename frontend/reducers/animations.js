//TODO
import { ANIMATE_IN, CLEAR_ANIMATION } from '../actions/notes'
import merge from 'lodash/merge'

const animationsReducer = (state={},action) =>{
  switch(action.type){
    case ANIMATE_IN:
      console.log('in');
      return {[action.id]: 'note-enter'};
    case CLEAR_ANIMATION:
      console.log('out');
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    default:
      return state;
  }
}

export default animationsReducer

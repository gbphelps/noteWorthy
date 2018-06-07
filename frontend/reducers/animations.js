//TODO
import { ANIMATE_IN, ANIMATE_OUT, CLEAR_ANIMATION } from '../actions/notes'
import merge from 'lodash/merge'

const animationsReducer = (state={},action) =>{
  switch(action.type){
    case ANIMATE_IN:
      console.log('enter');
      return {[action.id]: 'note-enter'};
    case ANIMATE_OUT:
        console.log('leave');
        return {[action.id]: 'note-leave'};
    case CLEAR_ANIMATION:
      console.log('clear');
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    default:
      return state;
  }
}

export default animationsReducer

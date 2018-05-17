import { TOGGLE } from '../actions/ui';

const nullState = {
  notebooks: false,
  search: false
}



const uiReducer = (state = nullState, action) => {
  switch(action.type) {
    case TOGGLE:
      return Object.assign({},nullState, {[action.entity]: !state[action.entity]});
    default:
      return nullState;
  }
}

export default uiReducer;

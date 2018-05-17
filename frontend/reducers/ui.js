import { TOGGLE } from '../actions/ui';

const nullState = {
  notebooks: false,
  search: false,
  notes: false,
  shortcuts: false
}

const initialState = {
  notes: true,
  notebooks: false,
  search: false,
  shortcuts: false
}


const uiReducer = (state = nullState, action) => {
  switch(action.type) {
    case TOGGLE:
      console.log(state);
      return Object.assign({}, nullState, {[action.entity]: !state[action.entity]});
    default:
      return state;
  }
}

export default uiReducer;

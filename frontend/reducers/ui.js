import { TOGGLE } from '../actions/ui';

const nullState = {
  notebooks: false,
  search: false,
  notes: false,
  shortcuts: false,
  taggings: false
}

const initialState = {
  notes: true,
  notebooks: false,
  search: false,
  shortcuts: false,
  taggings: false
}


const uiReducer = (state = nullState, action) => {
  switch(action.type) {
    case TOGGLE:
      return Object.assign({}, nullState, {[action.entity]: !state[action.entity]});
    default:
      return state;
  }
}

export default uiReducer;

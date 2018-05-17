import { TOGGLE_NOTEBOOKS } from '../actions/ui'

const uiReducer = (state = {notebooks:false}, action) => {
  switch(action.type) {
    case TOGGLE_NOTEBOOKS:
      return Object.assign({}, state, {notebooks: !state.notebooks})
    default:
      return state;
  }
}

export default uiReducer;

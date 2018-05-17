import { TOGGLE_NOTEBOOKS, TOGGLE_SEARCH, TOGGLE_NOTES } from '../actions/ui';


const nullState = {
  notebooks: false,
  search: false
}



const uiReducer = (state = nullState, action) => {
  switch(action.type) {
    case TOGGLE_NOTEBOOKS:
      return Object.assign({}, nullState, {notebooks: !state.notebooks})
    case TOGGLE_SEARCH:
      return Object.assign({}, nullState, {search: !state.search})
    case TOGGLE_NOTES:
      return Object.assign({}, nullState, {notes: !state.notes})
    default:
      return nullState;
  }
}

export default uiReducer;

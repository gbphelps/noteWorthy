import {
  RECEIVE_NOTEBOOKS,
  RECEIVE_NOTEBOOK,
  REMOVE_NOTEBOOK } from '../actions/notebooks';
import merge from 'lodash/merge';

const notebooksReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_NOTEBOOKS:
      return action.notebooks;
    case RECEIVE_NOTEBOOK:
      debugger
      return merge({},state,{[action.payload.notebook.id]: action.payload.notebook});
    case REMOVE_NOTEBOOK:
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    default:
      return state
  }
};

export default notebooksReducer;

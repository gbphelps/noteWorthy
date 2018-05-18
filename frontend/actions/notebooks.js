import * as Api from '../utils/notebooks';
import { receiveNotes, clearNotes } from './notes';

export const RECEIVE_NOTEBOOKS = 'RECEIVE_NOTEBOOKS';
export const RECEIVE_NOTEBOOK = 'RECEIVE_NOTEBOOK';
export const REMOVE_NOTEBOOK = 'REMOVE_NOTEBOOK';

export const receiveNotebooks = notebooks => {
  return {
    type: 'RECEIVE_NOTEBOOKS',
    notebooks
  };
};

export const receiveNotebook = notebook => {
  return {
    type: 'RECEIVE_NOTEBOOK',
    payload: notebook
  };
};

export const removeNotebook = id => {
  return {
    type: 'REMOVE_NOTEBOOK',
    id
  };
};

export const fetchNotebooks = () => dispatch => {
  return Api.fetchNotebooks()
    .then(notebooks => dispatch(receiveNotebooks(notebooks)));
};



export const fetchFromNotebook = id => dispatch => {
  dispatch(clearNotes());
  return Api.fetchNotebook(id)
    .then(notebook => dispatch(receiveNotes(notebook.notes)))
};


export const createNotebook = notebook => dispatch => {
  return Api.createNotebook(notebook)
  .then(notebook => dispatch(receiveNotebook(notebook)));
};

export const deleteNotebook = id => dispatch => {
  return Api.deleteNotebook(id)
  .then(() => dispatch(removeNotebook(id)));
};

export const updateNotebook = notebook => dispatch => {
  return Api.updateNotebook(notebook)
    .then(notebook => dispatch(receiveNotebook(notebook)));
};

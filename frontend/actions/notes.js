import * as Api from '../utils/notes'

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const receiveNotes = notes => {
  return {
    type: RECEIVE_NOTES,
    notes
  };
};

export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const receiveNote = note => {
  return {
    type: RECEIVE_NOTE,
    payload: note
  };
};

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const removeNote = id => {
  return {
    type: REMOVE_NOTE,
    id
  };
};

export const fetchNotes = () => dispatch => {
  return Api.fetchNotes()
    .then(notes => dispatch(receiveNotes(notes)))
};


///NOT SURE YOU'RE USING - CONSIDER DELETING
export const fetchNote = id => dispatch => {
  return Api.fetchNote(id)
    .then(note => {
      dispatch(receiveNote(note))}
  )
}
////////////////////////////////////////////

export const updateNote = note => dispatch => {
  return Api.updateNote(note)
    .then(note => dispatch(receiveNote(note)))
};

export const createNote = note => dispatch => {
  return Api.createNote(note)
    .then(note => dispatch(receiveNote(note)))
};

export const deleteNote = id => dispatch => {
  return Api.deleteNote(id)
    .then(() => dispatch(removeNote(id)))
};

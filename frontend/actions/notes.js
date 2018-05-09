import * as Api from '../utils/notes'

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const receiveNotes = notes => {
  return {
    type: RECEIVE_NOTES,
    notes
  };
};

export const fetchNotes = () => dispatch => {
  return Api.fetchNotes()
    .then(notes => dispatch(receiveNotes(notes)))
};

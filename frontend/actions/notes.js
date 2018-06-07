import * as Api from '../utils/notes'



//TODO
export const ANIMATE_IN = 'ANIMATE_IN';
export const animateIn = (id) => {
  return {
    type: ANIMATE_IN,
    id
  };
};

export const ANIMATE_OUT = 'ANIMATE_OUT';
export const animateOut = (id) => {
  return {
    type: ANIMATE_OUT,
    id
  };
};

export const CLEAR_ANIMATION = 'CLEAR_ANIMATION';
export const clearAnimation = (id) => {
  return {
    type: CLEAR_ANIMATION,
    id
  };
}

/*//////////////////////////////////////////////////*/


export const RECEIVE_SHORTCUTS = 'RECEIVE_SHORTCUTS';
export const receiveShortcuts = notes => {
  return {
    type: RECEIVE_SHORTCUTS,
    notes
  };
};

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


export const fetchShortcuts = () => dispatch => {
  return Api.fetchShortcuts()
    .then(notes => dispatch(receiveShortcuts(notes)))
};

export const updateNote = note => dispatch => {
  return Api.updateNote(note)
    .then(note => {
      dispatch(receiveNote(note));
      return note.note.id;
    })
};

export const createNote = note => dispatch => {
  return Api.createNote(note)
    .then(note =>{
      dispatch(animateIn(note.note.id));
      setTimeout(()=>
        dispatch(clearAnimation(note.note.id)), 1500); //TODO
      dispatch(receiveNote(note));
      return note.note.id;
    })
};

export const deleteNote = id => dispatch => {
  return Api.deleteNote(id)
    .then(() => {
      dispatch(animateOut(id));
      setTimeout(()=>{
        dispatch(removeNote(id));
        dispatch(clearAnimation(id));
        }, 1500);
      return id;
    })
};

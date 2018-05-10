import React from 'react';
import TextEditor from './text_editor';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/notes';


const mapState = (state, ownProps) => {
  return {
    note: state.entities.notes[ownProps.match.params.noteId]
  };
};

const mapDispatch = dispatch => {
  return {
    onMount: id => dispatch(fetchNote(id)),
    action: note => dispatch(updateNote(note))
  };
};

export default connect(mapState,mapDispatch)(TextEditor);

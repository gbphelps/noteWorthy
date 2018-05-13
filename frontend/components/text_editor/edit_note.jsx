import React from 'react';
import TextEditor from './text_editor';
import { connect } from 'react-redux';
import { updateNote, fetchNote } from '../../actions/notes';
import * as Api from '../../utils/notes'


const mapState = (state, ownProps) => {
  return {
    note: state.entities.notes[ownProps.match.params.noteId],
    taggings: state.entities.taggings,
    formType: 'Edit Note'
  };
};

const mapDispatch = (dispatch,ownProps) => {
  return {
    onMount: id => dispatch(fetchNote(id)),
    action: note => dispatch(updateNote(note))
  };
};

export default connect(mapState,mapDispatch)(TextEditor);

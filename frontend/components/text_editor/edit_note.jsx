import React from 'react';
import TextEditor from './text_editor';
import { connect } from 'react-redux';
import { updateNote, fetchNote } from '../../actions/notes';
import { deleteTagging, createTagging } from '../../utils/taggings';



const mapState = (state, ownProps) => {
  return {
    note: state.entities.notes[ownProps.match.params.noteId],
    taggings: state.entities.taggings,
    formType: 'Edit'
  };
};

const mapDispatch = (dispatch,ownProps) => {
  return {
    onMount: id => dispatch(fetchNote(id)),
    action: note => dispatch(updateNote(note)),
    deleteTagging,
    createTagging,
  };
};

export default connect(mapState,mapDispatch)(TextEditor);

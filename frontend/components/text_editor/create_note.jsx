import React from 'react';
import TextEditor from './text_editor';
import { connect } from 'react-redux';
import { createNote } from '../../actions/notes';

const mapState = state => {
  return {
    note: {title:'', body:''},
    formType: 'Create'
  };
};

const mapDispatch = (dispatch,ownProps) => {
  return {
    action: note => dispatch(createNote(note)),
    onMount: ()=>{}
  };
};

export default connect(mapState,mapDispatch)(TextEditor);

import React from 'react';
import TextEditor from './text_editor';
import { connect } from 'react-redux';
import { createNote } from '../../actions/notes';
import { createTagging } from '../../utils/taggings'

const mapState = state => {
  return {
    note: {title:'', body:''},
    formType: 'Create Note',
    taggings: {},
  };
};

const mapDispatch = (dispatch,ownProps) => {
  return {
    action: note => dispatch(createNote(note)),
    fetchNote: ()=>{},
    createTagging
  };
};

export default connect(mapState,mapDispatch)(TextEditor);

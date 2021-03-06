import React from 'react';
import TextEditor from './text_editor';
import { connect } from 'react-redux';
import { createNote } from '../../actions/notes';
import { createTagging } from '../../actions/taggings';
import { withRouter } from 'react-router-dom'


const mapState = state => {
  return {
    note: {title:'', body:''},
    formType: 'Create',
    taggings: {},
  };
};

const mapDispatch = (dispatch,ownProps) => {
  return {
    action: note => dispatch(createNote(note)),
    fetchNote: ()=>{},
    createTagging: tagging => dispatch(createTagging(tagging)),
    deleteTagging: ()=>{},
  };
};

export default withRouter(connect(mapState,mapDispatch)(TextEditor));

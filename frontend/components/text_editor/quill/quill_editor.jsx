import Quill from 'quill';
import React from 'react';

export default class QuillEditor extends React.Component{

  componentDidMount(){
    const container = document.getElementById('editor');
    const toolbarOptions = [
      ['bold','italic','underline']
    ]

    const options = {
      debug: 'info',
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    };
    const editor = new Quill(container, options);
  }

  render(){
    return(
      <div>
        <div id='toolbar'/>
        <div id='editor'/>
      </div>
    );
  }
}

import React from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js'

class TextEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.editor.focus();
    this.toggleColor = (color) => this._toggleColor(color);


    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this._onItalicClick = this._onItalicClick.bind(this);
  }

  _onBoldClick(){
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick(){
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }


  handleKeyCommand(command, editorState){
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }





  render(){
    return(
      <div className='draft-editor'>
        <div onClick={this._onBoldClick}>BOLD</div>
        <div onClick={this._onItalicClick}>ITALIC</div>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange} />
      </div>
    );
  }
}

export default TextEditor;

import React from 'react';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import { colorStyleMap } from './colors'

export default class ColorfulEditorExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  }


  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }


  render() {
    const {editorState} = this.state;
    return (
      <div className='editor-root'>

        <EditorHeader
          editorState={editorState}
          onToggle={this.toggleColor}
        />

        <div
          className='editor-body'
          onClick={this.focus}>
            <Editor
              customStyleMap={colorStyleMap}
              editorState={editorState}
              onChange={this.onChange}
              placeholder="Note here..."
              ref={(ref) => this.editor = ref}
            />

        </div>
      </div>
    );
  }
}



class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let border;
    if (this.props.active) {
      border = '1px solid black';
    } else {
      border = 'none';
    }
    return (
      <div
        className='color-swatch'
        onMouseDown={this.onToggle}
        style={{background: this.props.color, border}}>
      </div>
    );
  }
}

const EditorHeader = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className='editor-header'>
      <div className='control-panel'>
        <div>Hello World</div>


        <div className='color-tab'>Colors
          <div className='color-popup'>
          {Object.keys(colorStyleMap).map(color =>
            <StyleButton
              active={currentStyle.has(color)}
              onToggle={props.onToggle}
              style={color}
              color={colorStyleMap[color].color}
              key={color}
            />
          )}
          </div>
        </div>
    </div>
  </div>
  );
};

import React from 'react';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import { colorStyleMap } from './colors';
import { fontStyleMap } from './fonts';
import values from 'lodash/values';

export default class ColorfulEditorExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  }




/////////////////////////////////////////////////////
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
    console.log(currentStyle);
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
/////////////////////////////////////////////////////
//
// _toggleFont(toggledFont) {
//   const {editorState} = this.state;
//   const selection = editorState.getSelection();
//
//   // Let's just allow one color at a time. Turn off all active colors.
//   const nextContentState = Object.keys(fontStyleMap)
//     .reduce((contentState, font) => {
//       return Modifier.removeInlineStyle(contentState, selection, fontFamily)
//     }, editorState.getCurrentContent());
//   let nextEditorState = EditorState.push(
//     editorState,
//     nextContentState,
//     'change-inline-style'
//   );
//   const currentStyle = editorState.getCurrentInlineStyle();
//   console.log(currentStyle);
//   // Unset style override for current font.
//   if (selection.isCollapsed()) {
//     nextEditorState = currentStyle.reduce((state, fontFamily) => {
//       return RichUtils.toggleInlineStyle(state, fontFamily);
//     }, nextEditorState);
//   }
//
//   // If the font is being toggled on, apply it.
//   if (!currentStyle.has(toggledFont)) {
//     nextEditorState = RichUtils.toggleInlineStyle(
//       nextEditorState,
//       toggledFont
//     );
//   }
//
//   this.onChange(nextEditorState);
// }
///////////////////////////////////////////////////////////











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
              customStyleMap={Object.assign(colorStyleMap,fontStyleMap)}
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


//////////////////////////////////////
class ColorButton extends React.Component {
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
///////////////////////////////////////////////////

class FontButton extends React.Component {
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
      <li
        className='font-name'
        onMouseDown={this.onToggle}
        style={{border}}>
        {this.props.fontName}
      </li>
    );
  }
}
//////////////////////////////////




const EditorHeader = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className='editor-header'>
      <div className='control-panel'>


        <div className='font-tab'>Fonts
           <div className='font-popup'>
            <ul>
              {Object.keys(fontStyleMap).map(font =>
                <FontButton
                  active={currentStyle.has(font)}
                  onToggle={props.onToggle}
                  style={font}
                  fontName={font}
                  key={font}/>)}
            </ul>
          </div>
        </div>


        <div className='color-tab'>Colors
          <div className='color-popup'>
          {Object.keys(colorStyleMap).map(color =>
            <ColorButton
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

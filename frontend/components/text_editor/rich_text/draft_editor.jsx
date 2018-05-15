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
    this.toggleProperty = this.toggleProperty.bind(this)
  }




/////////////////////////////////////////////////////
  toggleProperty(styleMap){
  return toggledStyle => {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    //TURN OFF ALL OTHER STYLES IN THIS MAP
    const nextContentState = Object.keys(styleMap).reduce(
        (contentState, style) => {
        return Modifier.removeInlineStyle(
          contentState,
          selection,
          style)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();
    console.log('CurrentStyle', currentStyle);

    // Unset style override for current style.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, style) => {
        return styleMap[style] ? RichUtils.toggleInlineStyle(state, style) : state
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }

    this.onChange(nextEditorState);
  }
}


  render() {
    const {editorState} = this.state;
    return (
      <div className='editor-root'>

        <EditorHeader
          editorState={editorState}
          onColorToggle={this.toggleProperty(colorStyleMap)}
          onFontToggle={this.toggleProperty(fontStyleMap)}
        />

        <div
          className='editor-body'
          onClick={this.focus}>
            <Editor
              customStyleMap={Object.assign({},colorStyleMap,fontStyleMap)}
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
    console.log(props);
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
                  onToggle={props.onFontToggle}
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
              onToggle={props.onColorToggle}
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

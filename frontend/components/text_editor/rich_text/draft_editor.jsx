import React from 'react';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import values from 'lodash/values';

import * as Maps from './style_maps';
import ControlPanel from './controls/control_panel';

const allStyles =
  values(Maps).reduce(
    (acc,map) =>
      Object.assign(acc,map),{}
    );

export default class RichTextEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      style:{}
    };
    this.focus = () => this.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.toggleProperty = this.toggleProperty.bind(this);
  }

  onChange(editorState){
    this.setState({ editorState })
  }

  getStyle(){
    let styles = {
      color: '#000',
      fontFamily: 'Georgia',
      fontSize: '14pt'
    };

    values(Maps).map(styleMap =>
      Object.keys(styleMap).forEach(style => {
        if (this.state.editorState.getCurrentInlineStyle().has(style)) styles = Object.assign(styles, allStyles[style]);}
      ))
    return styles;
  }


  toggleProperty(styleMap){
  //return curried function that handles the specific set of styles contained in styleMap
  return (e, toggledStyle) => {
    e.preventDefault();

    const {editorState} = this.state;
    const selection = editorState.getSelection();

    //remove all styles in styleMap from selection
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
    // Unset style override for current style.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, style) => {
        return styleMap[style] ? RichUtils.toggleInlineStyle(state, style) : state
        //only remove style if it is in the current styleMap
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledStyle
      );
    }

    const active = this.getStyle();
    const next = allStyles[toggledStyle];
    this.setState({ editorState:nextEditorState, style:Object.assign(active,next) })
    // this.onChange(nextEditorState);
  }
}


  render() {
    const {editorState} = this.state;
    return (
      <div className='editor-root' onClick={this.focus}>

        <ControlPanel
          editorState={editorState}
          toggleProperty={this.toggleProperty}/>

        <div
          className='editor-body'
          onClick={this.getStyle}>
            <Editor
              customStyleMap={allStyles}
              editorState={editorState}
              onChange={this.onChange}
              placeholder="Note here..."
              ref={(ref) => this.editor = ref}/>
        </div>
      </div>
    );
  }
}

import React from 'react';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import values from 'lodash/values';

import * as Maps from './style_maps/style_maps';
import ControlPanel from './controls/control_panel';

const allStyles = values(Maps).reduce((acc,map)=> Object.assign(acc,map),{});








export default class RichTextEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleProperty = this.toggleProperty.bind(this)
  }

  toggleProperty(styleMap){
  //return curried function that handles the specific set of styles contained in styleMap
  return toggledStyle => {
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
    console.log('CurrentStyle', currentStyle);

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

    this.onChange(nextEditorState);
  }
}


  render() {
    const {editorState} = this.state;
    return (
      <div className='editor-root'>

        <ControlPanel
          editorState={editorState}
          toggleProperty={this.toggleProperty}
        />

        <div
          className='editor-body'
          onClick={this.focus}>
            <Editor
              customStyleMap={allStyles}
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

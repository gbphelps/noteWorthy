import React from 'React'

import { colorStyleMap } from '../style_maps/colors';
import { fontStyleMap } from '../style_maps/fonts';
import { fontSizeStyleMap } from '../style_maps/font_sizes';

import ColorButton from './color';
import FontButton from './font';

const ControlPanel = (props) => {
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
                  onToggle={props.toggleProperty(fontStyleMap)}
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
              onToggle={props.toggleProperty(colorStyleMap)}
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

export default ControlPanel;

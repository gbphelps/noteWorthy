import React from 'React'

import * as Maps from '../style_maps/style_maps'

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
              {Object.keys(Maps.fontFamily).map(font =>
                <FontButton
                  active={currentStyle.has(font)}
                  onToggle={props.toggleProperty(Maps.fontFamily)}
                  style={font}
                  fontName={font}
                  key={font}/>)}
            </ul>
          </div>
        </div>


        <div className='color-tab'>Colors
          <div className='color-popup'>
          {Object.keys(Maps.color).map(color =>
            <ColorButton
              active={currentStyle.has(color)}
              onToggle={props.toggleProperty(Maps.color)}
              style={color}
              color={Maps.color[color].color}
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

import React from 'React'

import * as Maps from '../style_maps'

import ColorButton from './color';
import FontButton from './font';






const ControlPanel = (props) => {

  const currentStyle = props.editorState.getCurrentInlineStyle();
  //constructs a radio panel when given a button component and a map of styles
  const RadioPanel = ({component: Component, styleMap}) => {
    return Object.keys(styleMap).map(value => {
      return (
        <Component
          active={currentStyle.has(value)}
          onToggle={props.toggleProperty(styleMap)}
          style={value}
          key={value}/>
      );
    });
  };

  return (
    <div className='editor-header'>
      <div className='control-panel'>


        <div className='font-tab'>Fonts
           <div className='font-popup'>
            <ul>
              <RadioPanel
                component={FontButton}
                styleMap={Maps.fontFamily}/>
            </ul>
          </div>
        </div>


        <div className='color-tab'>Colors
          <div className='color-popup'>
            <RadioPanel
              component={ColorButton}
              styleMap={Maps.color}/>
          </div>
        </div>

        <div className='size-tab'>Size
           <div className='size-popup'>
            <ul>
              <RadioPanel
                component={FontButton}
                styleMap={Maps.fontSize}/>
            </ul>
          </div>
        </div>

    </div>
  </div>
  );
};

export default ControlPanel;

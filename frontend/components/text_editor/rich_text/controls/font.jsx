import React from 'react';



const FontButton = ({style, onToggle, active}) => {
  let background, color;
  if (active) {
    background = '#2dbe60';
    color = 'white'; }
  else { background = 'white'; color = 'inherit'; }

  return (
    <li
      className='font-name radio'
      onMouseDown={e=> {onToggle(e, style)}}
      style={{background,color}}>
      {style}
    </li>
  );
};

export default FontButton;

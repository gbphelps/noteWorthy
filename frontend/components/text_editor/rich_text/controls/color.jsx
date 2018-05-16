import React from 'react';

const ColorButton = ({style, onToggle, active})=> {
  const border = active ? '1px solid black' : 'none';
  return (
    <div
      className='color-swatch radio'
      onMouseDown={e=>{onToggle(e, style)}}
      style={{background: style, border}}>
    </div>
  );
}

export default ColorButton

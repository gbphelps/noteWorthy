import React from 'react'

export const Toolbar = () => (
  <div id="toolbar">

  <select className="ql-size">
    <option value="small">Small</option>
    <option defaultValue></option>
    <option value="large"></option>
    <option value="huge"></option>
  </select>

  <select className="ql-font">
    <option value='lato'>Lato</option>
    <option value='monospace'>Monospace</option>
    <option value='georgia'>Georgia</option>
    <option value='arial'>Arial</option>
    <option value='pressStart2P'>Pixels</option>
    <option value='pacifico'>Pacifico</option>
    <option value='permanentMarker'>Sharpie</option>
    <option value='courier'>Courier</option>
    <option value='times'>Times</option>
  </select>

  <button className="ql-link"></button>
  <button className="ql-bold"></button>
  <button className="ql-italic"></button>
  <select className="ql-color"></select>
  <select className="ql-background"></select>

  <button className="ql-list" value="ordered"></button>
  <button className="ql-list" value="bullet"></button>



  <button className="ql-script" value="sub"></button>
  <button className="ql-script" value="super"></button>
</div>

);

import React from 'react'

export const Toolbar = () => (
  <div id="toolbar">

  <select className="ql-size">
    <option value="small"></option>
    <option selected></option>
    <option value="large"></option>
    <option value="huge"></option>
  </select>

  <button className="ql-bold"></button>
  <button className="ql-italic"></button>
  <button className="ql-list" value="ordered"></button>
  <button className="ql-list" value="bullet"></button>
  <button className="ql-link"></button>

  <select className="ql-color"></select>
  <select className="ql-background"></select>

  <button className="ql-script" value="sub"></button>
  <button className="ql-script" value="super"></button>
</div>

);

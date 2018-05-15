import React from 'react';

export default class ColorButton extends React.Component {
  constructor(props) {
    super(props);
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
        className='color-swatch radio'
        onMouseDown={e => this.props.onToggle(e)(this.props.style)}
        style={{background: this.props.style, border}}>
      </div>
    );
  }
}

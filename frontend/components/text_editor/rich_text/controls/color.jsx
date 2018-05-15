import React from 'react';

export default class ColorButton extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
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
        className='color-swatch'
        onMouseDown={this.onToggle}
        style={{background: this.props.color, border}}>
      </div>
    );
  }
}

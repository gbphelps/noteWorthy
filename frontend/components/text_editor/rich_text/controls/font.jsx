import React from 'react';

export default class FontButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let background;
    let color;
    if (this.props.active) {
      background = '#2dbe60';
      color = 'white';
    } else {
      background = 'white';
      color = 'inherit';
    }
    return (
      <li
        className='font-name radio'
        onMouseDown={e => this.props.onToggle(e)(this.props.style)}
        style={{background,color}}>
        {this.props.style}
      </li>
    );
  }
}

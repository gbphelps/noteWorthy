import React from 'react';

export default class FontButton extends React.Component {
  constructor(props) {
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
      <li
        className='font-name'
        onMouseDown={this.onToggle}
        style={{border}}>
        {this.props.style}
      </li>
    );
  }
}

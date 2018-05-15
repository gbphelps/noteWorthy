import React from 'react';

export default class FontButton extends React.Component {
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
      <li
        className='font-name'
        onMouseDown={e => this.props.onToggle(e)(this.props.style)}
        style={{border}}>
        {this.props.style}
      </li>
    );
  }
}

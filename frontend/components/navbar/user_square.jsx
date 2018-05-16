import React from 'react';

export default class UserSquare extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false
    };
    this.toggle = this.toggle.bind(this)
  }

  status(){
    return (this.state.active ? '' : 'hidden')
  }

  toggle(){
    const active = this.state.active;
    this.setState({active: !active});
  }


  render(){
    return(
      <div className='user-square' onClick={this.toggle}>
        <i className="fas fa-cog"></i>
        <div className={'user-popup ' + this.status()}>
          <button
            className='accent button'
            style={{margin:'auto',display:'block'}}
            onClick={this.props.logout}>
            Log Out
          </button>
        </div>
      </div>
    );
  }
}

import React from 'react';

export default class UserSquare extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false
    };
    this.toggle = this.toggle.bind(this)
    console.log(props);
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
        <div className={'user-popup ' + this.status()}>
          <button onClick={this.props.logout}>Log Out</button>
        </div>
      </div>
    );
  }
}

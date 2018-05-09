import React from 'react';
import { connect } from 'react-redux';





class UserSquare extends React.Component {
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
        <div className={'user-popup ' + this.status()}/>
      </div>
    );
  }
}



class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  popup(text,icon){
    return(
      <div className={icon + ' icon'}>
        <div className='popup'>
          <img className='popup-arrow' src={popupTail}/>
          <div className='popup-body'>{text}</div>
        </div>
      </div>
    );
  }

  render(){
    return(
      <div className='left-nav'>
        <img className='icon-elephant' src={elephantSmall}/>

        <nav className='upper-nav'>
          {this.popup('New Note','plus')}
          {this.popup('New Meeting Note', 'mtgnote')}
          {this.popup('Search', 'search')}
        </nav>

        <nav className='lower-nav'>
          {this.popup('Shortcuts', 'star')}
          {this.popup('Notes', 'note')}
          {this.popup('Notebooks', 'notebook')}
          {this.popup('Tags', 'tag')}
        </nav>

        <UserSquare/>

      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.session
  };
};

export default connect(mapState)(NavBar)

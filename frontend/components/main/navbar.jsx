import React from 'react';
import { connect } from 'react-redux';
import UserSquare from './user_square';
import { logout } from '../../actions/session'

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

        <UserSquare logout={ this.props.logout }/>

      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.session
  };
};

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};



export default connect(mapState,mapDispatch)(NavBar)

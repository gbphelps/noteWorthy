import React from 'react';
import { connect } from 'react-redux';
import UserSquare from './user_square';
import { logout } from '../../actions/session';
import { Link, withRouter } from 'react-router-dom';
import { toggleNotebooks, toggleSearch, toggleNotes } from '../../actions/ui';


let LinkedIcon = ({text, icon, path}) => {
  return (
    <Link to={path}>
      <div className={icon + ' icon'}>
        <div className='popup'>
          <img className='popup-arrow' src={popupTail}/>
          <div className='popup-body'>{text}</div>
        </div>
      </div>
    </Link>
  );
}

LinkedIcon = withRouter(LinkedIcon);




class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className='left-nav'>
        <img className='icon-elephant' src={elephantSmall}/>

        <nav className='upper-nav'>
          <LinkedIcon
            text='New Note'
            icon='plus'
            path='/'/>
          <LinkedIcon
            text='New Meeting Note'
            icon='mtgnote'
            path='/'/>

          <div className={'search icon'} onClick={this.props.toggleSearch}>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>Search</div>
            </div>
          </div>
        </nav>

        <nav className='lower-nav'>
          <LinkedIcon
            text='Shortcuts'
            icon='star'
            path='/'/>

          <div className={'note icon'} onClick={this.props.toggleNotes}>
              <div className='popup'>
                <img className='popup-arrow' src={popupTail}/>
                <div className='popup-body'>Notes</div>
              </div>
            </div>

          <div className={'notebook icon'} onClick={this.props.toggleNotebooks}>
              <div className='popup'>
                <img className='popup-arrow' src={popupTail}/>
                <div className='popup-body'>Notebooks</div>
              </div>
            </div>

          <LinkedIcon
            text='Tags'
            icon='tag'
            path='/'/>
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
    logout: () => dispatch(logout()),
    toggleNotebooks: () => dispatch(toggleNotebooks()),
    toggleSearch: () => dispatch(toggleSearch()),
    toggleNotes: () => dispatch(toggleNotes())
  };
};



export default connect(mapState,mapDispatch)(NavBar)

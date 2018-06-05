import React from 'react';
import { connect } from 'react-redux';
import UserSquare from './user_square';
import { logout } from '../../actions/session';
import { Link, withRouter } from 'react-router-dom';
import { toggle } from '../../actions/ui';


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


          <div className={'plus icon'} onClick={()=>{
              this.props.toggle('notes');
              this.props.history.push(`/home/${this.props.notebookId || 'inbox'}/`);
            }}>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>New Note</div>
            </div>
          </div>

          <LinkedIcon
            text='New Meeting Note'
            icon='mtgnote'
            path='/'/>

          <div className={'search icon'} onClick={()=>this.props.toggle('search')}>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>Search</div>
            </div>
          </div>
        </nav>

        <nav className='lower-nav'>

          <div className={'star icon'} onClick={()=>this.props.toggle('shortcuts')}>
              <div className='popup'>
                <img className='popup-arrow' src={popupTail}/>
                <div className='popup-body'>Shortcuts</div>
              </div>
            </div>

          <div className={'note icon'} onClick={()=>this.props.toggle('notes')}>
              <div className='popup'>
                <img className='popup-arrow' src={popupTail}/>
                <div className='popup-body'>Notes</div>
              </div>
            </div>

          <div className={'notebook icon'} onClick={()=>this.props.toggle('notebooks')}>
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
    toggle: entity => dispatch(toggle(entity)),
  };
};



export default withRouter(connect(mapState,mapDispatch)(NavBar))

import React from 'react';
import { logout } from '../actions/session';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {

  loggedIn(){
    return(
      <div>
        Welcome, {this.props.user.username}!
        <button onClick={this.props.logout}>Log Out</button>
      </div>
    );
  }

  loggedOut(){
    return(
      <div>
        Welcome!
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Log In</Link>
      </div>
    );
  }

  render(){
    return (this.props.user.id ? this.loggedIn() : this.loggedOut());
  }
}

const mapState = state => {
  return {
    user: state.session
  };
};

const mapDispatch = dispatch => {
  return {
    logout:() => dispatch(logout())
  };
};

export default connect(mapState,mapDispatch)(Greeting);

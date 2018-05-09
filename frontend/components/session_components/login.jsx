import React from 'react';
import { Link } from 'react-router-dom'

export default class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      identifier:'',
      password:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
  }


  listErrors(){
    return this.props.errors.map((error,i) => <li key={i}>{error}</li>);
  }

  demoLogin(e){
    e.preventDefault();
    this.props.action({identifier:'grant',password:'password'});
  }

  render(){
    return(
      <div>
        <img className='icon-elephant' src='assets/elephant.png'/>
        <h1>Sign In</h1>

        <form onSubmit={this.handleSubmit} className='sign-in'>

          <button onClick={this.demoLogin}>Demo User</button>

          <div className='divider'>
            <div className='line'></div>
            or
            <div className='line'></div>
          </div>

          <input
            type='text'
            placeholder='Email or Username'
            value={this.state.identifier}
            onChange={this.update('identifier')}/>
          <div className=''>
            <input
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.update('password')}/>
          </div>
          <button className='accent'>Log In</button>
          {this.listErrors()}
        </form>
        <h5>Don't have an accout?</h5>
        <h2><Link to='/signup'>Create Account</Link></h2>
      </div>
    );
  }
}

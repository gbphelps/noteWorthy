import React from 'react';
import { Link } from 'react-router-dom'

export default class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      identifier: '',
      password: '',
      passwordField: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.lookup = this.lookup.bind(this);
    this.growPassword = this.growPassword.bind(this);
  }

  update(field){
    return e => {
      this.setState({[field]: e.target.value});
      if (field=='identifier'){
        this.setState({passwordField: false})
      };
    };
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

  lookup(e){
    e.preventDefault();
    this.props.lookup(this.state.identifier).then(this.growPassword);
  }

  growPassword(){
    console.log('Hello!');
    this.setState({passwordField: true});
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }


  render(){
    return(
      <div>
        <img className='icon-elephant' src={elephantLarge}/>
        <h1>Sign In</h1>

        <form className='sign-in'>

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
          <div className={this.state.passwordField ? 'grown' : 'grow'}>
            <div className=''>
              <input
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={this.update('password')}/>
            </div>
          </div>
          <button className='accent' onClick={
              this.state.passwordField ?
              this.handleSubmit :
              this.lookup}>
              {this.state.passwordField ?
                'Log In' :
                'Continue'}
          </button>
          {this.listErrors()}
        </form>
        <h5>Don't have an accout?</h5>
        <h2><Link to='/signup'>Create Account</Link></h2>
      </div>
    );
  }
}

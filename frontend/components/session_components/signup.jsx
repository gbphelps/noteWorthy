import React from 'react';
import { Link } from 'react-router-dom';
export default class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      username:'',
      password:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  componentWillUnmount(){
    this.props.clearErrors();
  }

  render(){
    return(
      <div>
        <img className='icon-elephant' src={elephantLarge}/>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} className='sign-in'>
          <input
            type='text'
            placeholder='Username'
            value={this.state.username}
            onChange={this.update('username')}/>
          <input
            type='text'
            value={this.state.email}
            placeholder='Email'
            onChange={this.update('email')}/>
          <input
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.update('password')}/>
          <button className='accent'>Sign Up</button>
          {this.listErrors()}
        </form>
        <h5>Already have an account?</h5>
        <h2><Link to='/login'>Sign In</Link></h2>
      </div>
    );
  }
}

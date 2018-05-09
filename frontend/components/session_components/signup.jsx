import React from 'react';

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

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit} className='sign-in'>
          Email
          <input
            type='text'
            value={this.state.email}
            onChange={this.update('email')}/>
          Username
          <input
            type='text'
            value={this.state.username}
            onChange={this.update('username')}/>
          Password
          <input
            type='password'
            value={this.state.password}
            onChange={this.update('password')}/>
          <button>Sign Up</button>
          {this.listErrors()}
        </form>
      </div>
    );
  }
}

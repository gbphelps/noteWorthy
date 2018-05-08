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
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.email}
          onChange={this.update('email')}/>
        <input
          type='text'
          value={this.state.username}
          onChange={this.update('username')}/>
        <input
          type='password'
          value={this.state.password}
          onChange={this.update('password')}/>
        <button>{this.props.formType}</button>
        {this.listErrors()}
      </form>
    );
  }
}

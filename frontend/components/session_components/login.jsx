import React from 'react';

export default class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      identifier:'',
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
      <form onSubmit={this.handleSubmit} className='sign-in'>

        <button class='button'>Demo User</button>


        <div class='divider'>
          <div class='line'></div>
          or
          <div class='line'></div>
        </div>

        Email or Username
        <input
          type='text'
          value={this.state.identifier}
          onChange={this.update('identifier')}/>
        Password
        <input
          type='password'
          value={this.state.password}
          onChange={this.update('password')}/>
        <button class='button accent'>Log In</button>
        {this.listErrors()}
      </form>
    );
  }
}

import React from 'react';

export default class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state=props.note;
    this.handleSubmit=this.handleSubmit.bind(this);
    console.log(props.note);
  }

  componentDidMount(){
    this.props.onMount();
  }

  update(field){
    return e => {
      this.setState({[field]: e.target.value})
    };
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text'
          value={this.state.title}
          onChange={this.update('title')}/>
        <textarea
          onChange={this.update('body')}
          value={this.state.body}/>
        <button>Submit</button>
      </form>
    );
  }
}

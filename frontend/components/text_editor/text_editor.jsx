import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../../actions/notes'

class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // this.props.fetchNote(this.props.match.params.noteId)
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

const mapState = (state, ownProps) => {
  return {
    // note: state.notes[ownProps.match.params.noteId] || {title:'',body:''}
  };
};

const mapDispatch = dispatch => {
  return {
    // fetchNote: id => dispatch(fetchNote(id))
    action: note => dispatch(createNote(note))
  };
};

export default connect(mapState,mapDispatch)(TextEditor);

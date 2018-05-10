import React from 'react';
import { connect } from 'react-redux';
import { fetchNote } from '../../actions/notes'

class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={}
  }

  componentDidMount(){
    this.props.fetchNote(this.props.match.params.noteId)
  }

  render(){
    return(
      <div>Hellow Werld</div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    note: state.notes[ownProps.match.params.noteId] || {title:'',body:''}
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNote: id => dispatch(fetchNote(id))
  };
};

export default connect(mapState,mapDispatch)(TextEditor);

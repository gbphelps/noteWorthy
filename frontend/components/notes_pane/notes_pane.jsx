import React from 'react';
import values from 'lodash/values';
import { connect } from 'react-redux';
import { fetchNotes, deleteNote } from '../../actions/notes';
import NoteBody from './note_body'

class NotesPane extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animate: ''
    };
  }

  componentDidMount(){
    this.props.fetchNotes();
  }

  //TODO: add 'animations' to state and push in the most recent note to be
  //animated. Then get rid of all of this nasty conditional logic.

  componentWillReceiveProps(nextProps){
    const diff = nextProps.notes.length - this.props.notes.length;
    if ( diff === 1){
      this.setState({animate: 'animate'})
    }

    if (diff === -1){
      this.setState({animate: ''})
    }
  }

  notesList(){
    const list = [];
    const last = this.props.notes[this.props.notes.length-1];
    const rest = this.props.notes.slice(0,this.props.notes.length-1);
    rest.forEach(note =>
      list.unshift(
        <NoteBody
          key={note.id}
          note={note}
          deleteNote={this.props.deleteNote}
          animate=''/>
      ));
      list.unshift(
        <NoteBody
          key={last.id}
          note={last}
          deleteNote={this.props.deleteNote}
          animate={this.state.animate}/>
      );
    return list;
  }

  numNotes(){
    return this.props.notes.length;
  }

  render(){
    if (!this.props.notes.length) return null;
    return(
      <div className="pane-notes">
          <nav className="pane-header">
            <div>Notes</div>
            <div className='pane-subhead'>
              <div>{this.numNotes()} notes</div>
              <div className='options'>Options<img className='tiny pointer' src={downSmall}></img>
                <div className="options-popup"></div>
              </div>
            </div>
          </nav>
          <div className="pane-content">
              <div className="reminders">
                <div className='reminders-header'>
                  <div><img className='right-pointer' src={rightArrow}></img>Reminders</div>
                  <div className="reminders-counter">1<img className='reminder-icon' src={reminder}></img>
                    <div className='reminders-popup'></div>
                  </div>
                </div>
              </div>
              {this.notesList()}
          </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    notes: values(state.entities.notes)
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    deleteNote: id => dispatch(deleteNote(id)),
  }
};



export default connect(mapState,mapDispatch)(NotesPane)

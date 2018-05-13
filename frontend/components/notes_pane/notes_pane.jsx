import React from 'react';
import values from 'lodash/values';
import { connect } from 'react-redux';
import { fetchNotes, deleteNote } from '../../actions/notes';
import NoteBody from './note_body';
import { CSSTransitionGroup } from 'react-transition-group';

class NotesPane extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchNotes();
  }

  notesList(){
    const list = [];
    this.props.notes.forEach(note =>
      list.unshift(
        <NoteBody
          key={note.id}
          note={note}
          deleteNote={this.props.deleteNote}/>
      ));
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
              <CSSTransitionGroup
                transitionName='note'
                transitionEnterTimeout={1500}
                transitionLeaveTimeout={1000}>
                {this.notesList()}
              </CSSTransitionGroup>
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

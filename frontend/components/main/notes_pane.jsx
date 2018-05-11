import React from 'react';
import values from 'lodash/values';
import { connect } from 'react-redux';
import { fetchNotes, deleteNote } from '../../actions/notes';
import { formatTime } from '../../utils/format_time';
import { Link, withRouter } from 'react-router-dom'





class NoteBody extends React.Component {
  constructor(props){
    super(props);
    this.state={
      collapse: ''
    };
    this.collapse = this.collapse.bind(this)
  }

  crop(){
    return this.props.note.title.length > 15 ?
      this.props.note.title.slice(0,15) :
      this.props.note.title;
  }

  collapse(){
    this.setState({collapse: 'collapse'})
  }

  render(){
    return(
      <div className={`note-hover-event ${this.state.collapse}`}>
      <Link to={`/home/${this.props.note.id}`}>
        <div className="note-wrapper">
          <div className='note-body'>
            <div className='note-header'>
              <div className='title'>{this.crop()}</div>
            </div>
            <div className='date'>{formatTime(this.props.note.updated_at)}</div>
            <p className='body-of-note'>{this.props.note.body}</p>
          </div>
        </div>
      </Link>
      <NoteOptions
        note = {this.props.note}
        deleteNote = {this.props.deleteNote}
        collapse = {this.collapse}/>
    </div>
    );
  }
}



// props.deleteNote(props.note.id)}}>

let NoteOptions = (props) => {
 return(
   <div className='note-options'>
     <div className='note-icon note-share'></div>
     <div className='note-icon note-reminder'></div>
     <div className='note-icon note-star'></div>
     <div className='note-icon note-trash'
          onClick={(e) => {
            props.collapse();
            setTimeout(() => props.deleteNote(props.note.id),1000)}}>
     </div>
   </div>
 );
};

NoteOptions = withRouter(NoteOptions)


class NotesPane extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
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

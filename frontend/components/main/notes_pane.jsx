import React from 'react';
import values from 'lodash/values';
import { connect } from 'react-redux';
import { fetchNotes } from '../../actions/notes';
import { formatTime } from '../../utils/format_time';




const NoteBody = ({ note }) => {
  const type = typeof note.updated_at;
  return(
    <div className="note-body">
      <div className='title'>{note.title}</div>
      <div className='date'>{formatTime(note.updated_at)}</div>
      <div className='body'>{note.body}</div>
    </div>
  );
};

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
    this.props.notes.forEach((note,i) =>
      list.unshift(<NoteBody key={i} note={note}/>));
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
    fetchNotes: () => dispatch(fetchNotes())
  }
};



export default connect(mapState,mapDispatch)(NotesPane)

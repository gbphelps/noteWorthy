import React from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from '../../utils/format_time';
import NoteOptions from './note_options'

export default class NoteBody extends React.Component {
  constructor(props){
    super(props);
  }


  render(){
    return(
      <div className={`note-hover-event`}>
      <Link to={`/home/${this.props.note.id}`}>
        <div className="note-wrapper">
          <div className='note-body'>
            <div className='title'>{this.props.note.title || 'Untitled'}</div>
            <div className='date'>{formatTime(this.props.note.updated_at)}</div>
            <p className='body-of-note'>{JSON.parse(this.props.note.body).plainText}</p>
          </div>
        </div>
      </Link>
      <NoteOptions
        note = {this.props.note}
        deleteNote = {this.props.deleteNote}
        updateNote = {this.props.updateNote}/>
    </div>
    );
  }
}

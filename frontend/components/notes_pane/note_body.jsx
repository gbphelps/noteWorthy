import React from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from '../../utils/format_time';
import NoteOptions from './note_options'

export default class NoteBody extends React.Component {
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
      <div className={`note-hover-event ${this.state.collapse} ${this.props.animate}`}>
      <Link to={`/home/${this.props.note.id}`}>
        <div className="note-wrapper">
          <div className='note-body'>
            <div className='title'>{this.crop()}</div>
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

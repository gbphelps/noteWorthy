import React from 'react';
import values from 'lodash/values';
import { connect } from 'react-redux';
import { fetchNotes, deleteNote, updateNote } from '../../actions/notes';
import { fetchFromNotebook } from '../../actions/notebooks';
import NoteBody from './note_body';
import { CSSTransitionGroup } from 'react-transition-group';
import { toggle } from '../../actions/ui'
import { withRouter } from 'react-router-dom'

class NotesPane extends React.Component {
  constructor(props){
    super(props);

    this.state={
      on: false,
      panelExit: '',
    }
  }

  componentDidMount(){
    this.props.fetchNotes()
  }

/////////
  componentWillReceiveProps(nextProps){
    if (!nextProps.active && this.state.on){
      this.animateExit();
    }else if (!this.state.on && nextProps.active){
      this.setState({on: true, panelExit: false})
    }
  }

  animateExit(){
    this.setState({panelExit:'shrink-pane'});
    setTimeout(()=>this.setState({on: false}),900);
  }
/////////////


  notesList(){
    const loc = this.props.history.location.pathname.indexOf('/tags/');
    const tagFilterId = loc === -1 ? null : +this.props.history.location.pathname.slice(loc + 6); //TODO



    const animationID = this.props.animations;

    const list = [];
    const notebookId = this.props.match.params.notebookId;
    const activeNoteId = this.props.history.location.pathname.split('/')[3];

    this.props.notes.forEach(note => {


      if ((notebookId==='inbox' || note.notebook_id === +notebookId) &&
         (!tagFilterId || this.props.taggings.find(tagging =>
           tagging.tag_id === tagFilterId && tagging.note_id === note.id
         ))){ //TODO
      list.unshift(
        <NoteBody
          key={note.id}
          note={note}
          deleteNote={this.props.deleteNote}
          updateNote={this.props.updateNote}
          animate={ animationID[note.id] || '' }
          active={+activeNoteId === note.id ? 'green' : ''}/>
      )}});

    return [ list.length,list];
  }

  notebookName(){
    const id = this.props.match.params.notebookId;
    if (id === 'inbox') return 'INBOX';
    if (this.props.notebook) return this.props.notebook.name;
    return null;
  }
  ////////////////////////
  render(){
    let [length, list] = this.notesList();
    return(
      <div className='pane-notes'>
          <nav className="pane-header">
            <div>{this.notebookName()}</div>
            <div className='pane-subhead'>
              <div>{length} notes</div>
            </div>
          </nav>
          <div className="pane-content">
            {this.props.notes.length ? list : null}
          </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    notes: values(state.entities.notes),
    notebook: state.entities.notebooks[ownProps.match.params.notebookId],
    active: state.ui.notes,
    animations: state.animations,
    taggings: values(state.entities.allTaggings) //TODO
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    deleteNote: id => dispatch(deleteNote(id)),
    updateNote: note => dispatch(updateNote(note)),
    toggle: () => dispatch(toggle('notes')),
    fetchFromNotebook: id => dispatch(fetchFromNotebook(id))
  }
};



export default withRouter(connect(mapState,mapDispatch)(NotesPane))



// <div className="reminders">
//   <div className='reminders-header'>
//     <div><img className='right-pointer' src={rightArrow}></img>Reminders</div>
//     <div className="reminders-counter">1<img className='reminder-icon' src={reminder}></img>
//       <div className='reminders-popup'></div>
//     </div>
//   </div>
// </div>


// <CSSTransitionGroup
//   transitionName='note'
//   transitionEnterTimeout={1500}
//   transitionLeaveTimeout={1000}>

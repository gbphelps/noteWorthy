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
    //TODO: change this to fetchFromNotebook and use withRouter. Add logic to handle null/inbox
    //oof, other components need all of the notes though. need to implement with logic in the noteslist.
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
    const list = [];
    const notebookId = this.props.match.params.notebookId;

    this.props.notes.forEach(note => {
      if (notebookId==='null' || note.notebook_id === +notebookId){
      list.unshift(
        <NoteBody
          key={note.id}
          note={note}
          deleteNote={this.props.deleteNote}
          updateNote={this.props.updateNote}/>
      )}});

    return [ list.length,

        (<CSSTransitionGroup
          transitionName='note'
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1000}>
          {list}
        </CSSTransitionGroup>)
      ];
  }

  render(){
    let [length, list] = this.notesList();
    console.log(this.props.notebook);
    return(
      <div className='pane-notes'>
          <nav className="pane-header">
            <div>Notes</div>
            <div className='pane-subhead'>
              <div>{length} notes</div>
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
    active: state.ui.notes
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

import React from 'react';
import values from 'lodash/values';
import { connect } from 'react-redux';
import { fetchNotes, deleteNote, updateNote } from '../../actions/notes';
import NoteBody from './note_body';
import { CSSTransitionGroup } from 'react-transition-group';
import { toggle } from '../../actions/ui'

class NotesPane extends React.Component {
  constructor(props){
    super(props);

    this.state={
      on: false,
      panelExit: '',
    }
  }

  componentDidMount(){
    this.props.fetchNotes();
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
    this.props.notes.forEach(note =>
      list.unshift(
        <NoteBody
          key={note.id}
          note={note}
          deleteNote={this.props.deleteNote}
          updateNote={this.props.updateNote}/>
      ));
    return (
      <CSSTransitionGroup
        transitionName='note'
        transitionEnterTimeout={1500}
        transitionLeaveTimeout={1000}>
        {list}
      </CSSTransitionGroup>
    );
  }

  numNotes(){
    return this.props.notes.length;
  }

  render(){
    return(
      <div className='pane-notes'>
          <nav className="pane-header">
            <div>Notes</div>
            <div className='pane-subhead'>
              <div>{this.numNotes()} notes</div>
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
                {this.props.notes.length ? this.notesList() : null}
          </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    notes: values(state.entities.notes),
    active: state.ui.notes
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    deleteNote: id => dispatch(deleteNote(id)),
    updateNote: note => dispatch(updateNote(note)),
    toggle: () => dispatch(toggle('notes'))
  }
};



export default connect(mapState,mapDispatch)(NotesPane)



// <div className='options'>Options<img className='tiny pointer' src={downSmall}></img>
//   <div className="options-popup"></div>
// </div>

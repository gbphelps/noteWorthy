import React from 'react';
import { fetchNotes } from '../../actions/notes'
import { toggleSearch } from '../../actions/ui'
import { connect } from 'react-redux'
import values from 'lodash/values'

class SlidingPane extends React.Component {
  constructor(props){
    super(props);
    this.state={
      on: false,
      panelExit: '',
      search: ''
    }
    this.update = this.update.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    this.props.fetchNotes()
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.active && this.state.on){
      this.animateExit();
    }else if (!this.state.on && nextProps.active){
      this.setState({on: true, panelExit: false})
    }
  }

  animateExit(){
    this.setState({panelExit:'panel-exit'});
    setTimeout(()=>this.setState({on: false}),900);
  }

  onClick(id){
    this.props.toggleSearch();
    this.animateExit();
  }

  update(e){
      this.setState({search: e.target.value});
  }

  notesList(){
    return values(this.props.notes).map(note =>
      note.title.includes(this.state.search) ||
      note.body.includes(this.state.search) ? (
        <li
          key={note.id}>
          {note.title}
          {JSON.parse(note.body).plainText}
        </li>  ) : null )
  }

  render(){
    if (!this.state.on) return null;
    return(
      <div className={`notebooks-modular ${this.state.panelExit}`}>
        <div className='notebooks-veil'/>
        <div className='notebooks-pane'>
          <div>Search</div>
          <input
            className='input'
            placeholder='Search Notes'
            value={this.state.search}
            onChange={this.update}/>
          {this.notesList()}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    active: state.ui.search,
    notes: state.entities.notes,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotes()),
    toggleNotes: () => dispatch(toggleNotes())
  };
};

export default connect(mapState,mapDispatch)(SlidingPane)

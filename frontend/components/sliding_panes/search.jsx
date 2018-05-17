import React from 'react';
import { fetchNotes } from '../../actions/notes'
import { toggle } from '../../actions/ui'
import { connect } from 'react-redux'
import values from 'lodash/values'
import { withRouter } from 'react-router-dom'

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
    this.props.toggle();
    this.animateExit();
    this.props.history.push(`/home/${id}`);
  }

  update(e){
      this.setState({search: e.target.value});
  }

  notesList(){
    return values(this.props.notes).map(note =>
      note.title.includes(this.state.search) ||
      JSON.parse(note.body).plainText.includes(this.state.search) ? (
        <li className='search-entry-container'>
          <div
            className='search-entry'
            onClick={()=>this.onClick(note.id)}
            key={note.id}>

            <div className='notebook-search-entry-title'>
              {note.title || 'Untitled'}
            </div>

            <div className='notebook-search-entry-body'>
              {JSON.parse(note.body).plainText}
            </div>

          </div>
        </li>  ) : null )
  }

  render(){
    if (!this.state.on) return null;
    return(
      <div className={`notebooks-modular ${this.state.panelExit}`}>
        <div className='notebooks-veil'/>
        <div className='notebooks-pane'>

      <div className='notebooks-header'>
        <div className='pane-title'>Search</div>
          <div className='search-field-container'>
          <input
            className='search-field'
            placeholder='Search Notes'
            value={this.state.search}
            onChange={this.update}/>
        </div>
      </div>


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
    toggle: () => dispatch(toggle('search'))
  };
};

export default withRouter(connect(mapState,mapDispatch)(SlidingPane))

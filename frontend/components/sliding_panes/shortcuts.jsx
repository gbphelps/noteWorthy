import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggle } from '../../actions/ui';
import { fetchShortcuts } from '../../actions/notes';

import values from 'lodash/values'

class SlidingPane extends React.Component {
  constructor(props){
    super(props);
    this.state={
      on: false,
      panelExit: '',
    }
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    this.props.fetchShortcuts()
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.active && this.state.on){
      this.animateExit();
    }else if (!this.state.on && nextProps.active){
      this.props.fetchShortcuts();
      this.setState({on: true, panelExit: false})
    }
  }

  animateExit(){
    this.setState({panelExit:'panel-exit'});
    setTimeout(()=>this.setState({on: false}),900);
  }

  onClick(id){
    this.props.history.push(`/home/${id}`);
    this.props.toggle();
    this.animateExit();
  }

  shortcutsList(){
    console.log(this.props.shortcuts);
    return values(this.props.shortcuts).map(note =>
      <li key={note.id} className='search-entry-container'>
        <div
          className='search-entry'
          onClick={()=>this.onClick(note.id)}>
          <div className='notebook-search-entry-title'>{note.title}</div>
        </div>
      </li>);
  }

  render(){
    if (!this.state.on) return null;
    return(
      <div className={`notebooks-modular ${this.state.panelExit}`}>
        <div className='notebooks-veil'
             onClick={this.props.toggle}/>
        <div className='notebooks-pane'>

          <div className='notebooks-header'>
              <div className='pane-title'>Shortcuts</div>
          </div>

          {this.shortcutsList()}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    active: state.ui.shortcuts,
    shortcuts: state.entities.shortcuts,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchShortcuts: () => dispatch(fetchShortcuts()),
    toggle: () => dispatch(toggle('shortcuts'))
  };
};

export default withRouter(connect(mapState,mapDispatch)(SlidingPane))

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggle } from '../../actions/ui';
import { fetchNotebooks, fetchFromNotebook } from '../../actions/notebooks';

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
    this.props.fetchNotebooks()
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.active && this.state.on){
      this.animateExit();
    }else if (!this.state.on && nextProps.active){
      this.props.fetchNotebooks();
      this.setState({on: true, panelExit: false})
    }
  }

  animateExit(){
    this.setState({panelExit:'panel-exit'});
    setTimeout(()=>this.setState({on: false}),900);
  }

  onClick(id){
    this.props.history.push(`/home/${id || 'inbox'}`)
    this.props.toggle();
    this.animateExit();
  }

  update(e){
      this.setState({search: e.target.value});
  }

  notebookList(){
    return values(this.props.notebooks).map(notebook =>
      notebook.name.includes(this.state.search) ? (
        <li key={notebook.id} className='search-entry-container'>
        <div
          className='search-entry'
          onClick={()=>this.onClick(notebook.id)}>
          <div className='notebook-search-entry-title'>{notebook.name}</div>
          <div className='notebook-search-entry-body'>{notebook.notes.length} notes</div>
        </div>
      </li>  ) : null )
  }

  render(){
    if (!this.state.on) return null;
    return(
      <div className={`notebooks-modular ${this.state.panelExit}`}>
        <div className='notebooks-veil'
              onClick={this.props.toggle}/>
        <div className='notebooks-pane'>

          <div className='notebooks-header'>
              <div className='pane-title'>Notebooks</div>

              <div className='search-field-container'>
                <input
                  className='search-field'
                  placeholder='Search Notebooks'
                  value={this.state.search}
                  onChange={this.update}/>
              </div>
          </div>

          {this.notebookList()}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    active: state.ui.notebooks,
    notebooks: state.entities.notebooks,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchFromNotebook: id => dispatch(fetchFromNotebook(id)),
    toggle: () => dispatch(toggle('notebooks'))
  };
};

export default withRouter(connect(mapState,mapDispatch)(SlidingPane))

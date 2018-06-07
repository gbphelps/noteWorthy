import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggle } from '../../actions/ui';
import { fetchTags } from '../../actions/tags';
import { fetchTaggings } from '../../actions/taggings'

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
    this.props.fetchTaggings();
    this.props.fetchTags();
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.active && this.state.on){
      this.animateExit();
    }else if (!this.state.on && nextProps.active){
      this.props.fetchTaggings();
      this.setState({on: true, panelExit: false})
    }
  }

  animateExit(){
    this.setState({panelExit:'panel-exit'});
    setTimeout(()=>this.setState({on: false}),900);
  }

  onClick(id){
    this.props.toggle();
    this.props.history.push(`/home/inbox/tags/${id}`)
  }

  taggingsList(){
    return this.props.tags.map(tag => (
      <li className='search-entry-container'
          key={tag.id}
          style={{height:'auto'}}>
        <div className='search-entry'
             onClick={()=>this.onClick(tag.id)}
             style={{minHeight:'100px'}}>
             <div className='notebook-search-entry-title'>{tag.name}</div>
             {this.taggedNotes(tag.id)}
        </div>
      </li>
    ))
  }

  taggedNotes(tag_id){
    const taggings = this.props.taggings.filter(tagging => tagging.tag_id === tag_id);
    return taggings.map(tagging => {
      return (
        <div
          className='notebook-search-entry-body'
          style={{marginLeft: '10px'}}
          key={tagging.id}>{this.props.notes[tagging.note_id].title}</div>
      )
    });
  }

  render(){
    if (!this.state.on) return null;
    return(
      <div className={`notebooks-modular ${this.state.panelExit}`}>
        <div className='notebooks-veil'
             onClick={this.props.toggle}/>
        <div className='notebooks-pane'>

          <div className='notebooks-header'>
              <div className='pane-title'>Tags</div>
          </div>
            {this.taggingsList()}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    active: state.ui.taggings,
    taggings: values(state.entities.allTaggings),
    tags: values(state.entities.tags),
    notes: state.entities.notes
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTaggings: () => dispatch(fetchTaggings()),
    fetchTags: () => dispatch(fetchTags()),
    toggle: () => dispatch(toggle('taggings'))
  };
};

export default withRouter(connect(mapState,mapDispatch)(SlidingPane))

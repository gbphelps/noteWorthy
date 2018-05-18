import React from 'react';
import { connect } from 'react-redux';
import { fetchTags, createTag } from '../../actions/tags';
import values from 'lodash/values';
import { CSSTransitionGroup } from 'react-transition-group';


//TODO: Change popups to conditional render

class TagSelector extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  componentDidMount(){
    this.props.fetchTags();
  }

  selected(id){
    return this.props.taggings[id] ?
    'selected' : '';
  }


  tagsList(){
    const list = [];
    values(this.props.tags).forEach(tag =>
      list.unshift(
        <li
          onClick={()=>this.props.toggleTag(tag.id)}
          className={`note-li ${this.selected(tag.id)}`}
          key={tag.id}>
          {tag.name}
        </li>
      ));
    return (
      <CSSTransitionGroup
        transitionName='noteListItem'
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {list}
      </CSSTransitionGroup>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createTag(this.state)
    .then(action=>this.props.toggleTag(action.tag.id))
  }

  updateName(e){
    this.setState({name: e.target.value});
  }

  render(){
    return(
      <div className='tag-selector'>Select Tags
        <div className='tags-popup'>
          <form
            className='note-form'
            onSubmit={this.handleSubmit}>
            <input
              className='note-input'
              onChange={this.updateName}
              placeholder='New tag'
              value={this.state.name}/>
          </form>
          <ul>
            {values(this.props.tags).length ? this.tagsList() : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tags: state.entities.tags, //remember that these are object form still
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    createTag: tag => dispatch(createTag(tag))
  };
};

export default connect(mapState,mapDispatch)(TagSelector);

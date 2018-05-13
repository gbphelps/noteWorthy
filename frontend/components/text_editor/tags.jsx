import React from 'react';
import { connect } from 'react-redux';
import { fetchTags, createTag } from '../../actions/tags';
import values from 'lodash/values';

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

  tagsList(){
    return values(this.props.tags).map(tag => <li className='note-li' key={tag.id}>{tag.name}</li>);
  }

  handleSubmit(e){
    this.props.createTag(this.state)
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
            {this.tagsList()}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tags: state.entities.tags //remember that these are object form still
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    createTag: tag => dispatch(createTag(tag))
  };
};

export default connect(mapState,mapDispatch)(TagSelector);

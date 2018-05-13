import React from 'react';
import { connect } from 'react-redux';
import { fetchTags, createTag } from '../../actions/tags';
import values from 'lodash/values';

class TagSelector extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  componentDidMount(){
    this.props.fetchTags();
  }

  tagsList(){
    return values(this.props.tags).map(tag => <li key={tag.id}>{tag.name}</li>)
  }

  render(){
    return(
      <div className='tag-selector'>Select Tags</div>
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
    createTag: tag => dispatch(createTag())
  };
};

export default connect(mapState,mapDispatch)(TagSelector);

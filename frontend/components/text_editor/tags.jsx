import React from 'react';
import { connect } from 'react-redux';
import { fetchTags, createTag } from '../../actions/tags';
import values from 'lodash/values';

class TagSelector extends React.Component {
  constructor(props){
    super(props);
    this.state={}
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

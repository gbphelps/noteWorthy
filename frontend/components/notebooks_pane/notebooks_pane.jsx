import React from 'react';
import { connect } from 'react-redux';
import { toggleNotebooks } from '../../actions/ui'

class NotebooksPane extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }
////TODO: ADD LOGIC FOR TIMEOUT AND DISAPPEAR
  render(){
    if (!this.props.active) return null;
    return(
      <div className='notebooks-modular'>
        <div className='notebooks-veil' />
        <div className='notebooks-pane'>Hello World</div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    active: state.ui.notebooks
  };
};

export default connect(mapState)(NotebooksPane);

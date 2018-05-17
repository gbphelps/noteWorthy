import React from 'react';
import { connect } from 'react-redux';
import { toggleNotebooks } from '../../actions/ui'

class NotebooksPane extends React.Component {
  constructor(props){
    super(props);
    this.state={
      on: false,
      panelExit: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.active && this.state.on){
      this.setState({panelExit:'panel-exit'});
      setTimeout(()=>this.setState({on: false}),900);
    }else{
      this.setState({on: true, panelExit: false})
    }
  }

  render(){
    if (!this.state.on) return null;
    return(
      <div className={`notebooks-modular ${this.state.panelExit}`}>
        <div className='notebooks-veil'/>
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

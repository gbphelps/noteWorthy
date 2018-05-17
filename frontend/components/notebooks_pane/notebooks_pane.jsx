import React from 'react';
import { connect } from 'react-redux';
import { toggleNotebooks } from '../../actions/ui';
import { fetchNotebooks } from '../../actions/notebooks';
import values from 'lodash/values'

class NotebooksPane extends React.Component {
  constructor(props){
    super(props);
    this.state={
      on: false,
      panelExit: '',
      search: ''
    }
    this.update = this.update.bind(this)
  }

  componentDidMount(){
    this.props.fetchNotebooks()
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.active && this.state.on){
      this.setState({panelExit:'panel-exit'});
      setTimeout(()=>this.setState({on: false}),900);
    }else if (!this.state.on && nextProps.active){
      this.setState({on: true, panelExit: false})
    }
  }

  update(e){
      this.setState({search: e.target.value});
  }

  notebooksList(){
    return values(this.props.notebooks).map(notebook =>
      notebook.name.includes(this.state.search) ? (
        <li key={notebook.id}>
          {notebook.name}
        </li>  ) : null )
  }

  render(){
    if (!this.state.on) return null;
    return(
      <div className={`notebooks-modular ${this.state.panelExit}`}>
        <div className='notebooks-veil'/>
        <div className='notebooks-pane'>
          <div>Notebooks</div>
          <input
            className='input'
            placeholder='Search Notebooks'
            value={this.state.search}
            onChange={this.update}/>
          {this.notebooksList()}
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
    fetchNotebooks: () => dispatch(fetchNotebooks())
  };
};

export default connect(mapState, mapDispatch)(NotebooksPane);

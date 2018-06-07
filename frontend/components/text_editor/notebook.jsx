import React from 'react';
import { connect } from 'react-redux';
import { fetchNotebooks, createNotebook } from '../../actions/notebooks';
import values from 'lodash/values';
import { CSSTransitionGroup } from 'react-transition-group'


class NotebookSelector extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.fetchNotebooks();
  }

  selected(id){
    return this.props.notebookId === id ?
      'selected' : '';
  }

  notebooksList(){
    const list = []
    values(this.props.notebooks).forEach(notebook =>
      list.unshift(
        <li
          className={`note-li ${this.selected(notebook.id)}`}
          key={notebook.id}
          onClick={() => {
            this.props.setNotebook(notebook.id)
          }}>
          {notebook.name}
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
    this.props.createNotebook(this.state)
    .then(action=>this.props.setNotebook(action.payload.notebook.id))

    this.setState({name: ''})
  }

  notebookName(){
    return Object.keys(this.props.notebooks).length && this.props.notebookId ?
      this.props.notebooks[this.props.notebookId].name :
      'Select Notebook';
  }

  render(){
    return(
      <div className='notebook-selector'>
        {this.notebookName()}
        <div className='notebook-popup'>
          <form
            className='note-form'
            onSubmit={this.handleSubmit}>
            <input
              className='note-input'
              placeholder='New Notebook'
              value={this.state.name}
              onChange={(e)=>this.setState({name: e.target.value})}/>
          </form>
          <ul>
            {values(this.props.notebooks).length ? this.notebooksList() : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    notebooks: state.entities.notebooks
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: name => dispatch(createNotebook(name))
  };
};

export default connect(mapState,mapDispatch)(NotebookSelector)

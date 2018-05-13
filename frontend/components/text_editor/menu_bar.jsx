import React from 'react';
import { connect } from 'react-redux';
import { fetchNotebooks, createNotebook } from '../../actions/notebooks';
import values from 'lodash/values';
import { CSSTransitionGroup } from 'react-transition-group'

class MenuBar extends React.Component {
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
    return values(this.props.notebooks).map(notebook => (
      <li
        className={`notebook-li ${this.selected(notebook.id)}`}
        key={notebook.id}
        onClick={() => this.props.setNotebook(notebook.id)}>
        {notebook.name}
      </li>
    ));
  }

  handleSubmit(e){
    e.preventDefault;
    this.props.createNotebook(this.state);
    this.setState({name: ''})
  }

  notebookName(){
    return this.props.notebooks && this.props.notebookId ?
      this.props.notebooks[this.props.notebookId].name :
      'Select Notebook >';
  }

  render(){
    return(
      <div className='note-menu-bar'>
        {this.notebookName()}
        <div className='notebook-popup'>
          <form
            className='new-notebook'
            onSubmit={this.handleSubmit}>
            <input
              className='new-notebook-input'
              placeholder='New Notebook'
              value={this.state.name}
              onChange={(e)=>this.setState({name: e.target.value})}/>
          </form>
          <ul>
            <CSSTransitionGroup
              transitionName='notebook'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {this.notebooksList()}
            </CSSTransitionGroup>
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

export default connect(mapState,mapDispatch)(MenuBar)

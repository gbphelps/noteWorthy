import React from 'react';
import { connect } from 'react-redux';
import { fetchNotebooks } from '../../actions/notebooks';
import values from 'lodash/values'

class MenuBar extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  componentDidMount(){
    this.props.fetchNotebooks();
  }

  selected(id){
    return this.props.notebookId === id ?
      'selected' : '';
  }

  notebooksList(){
    return this.props.notebooks.map(notebook => (
      <li
        className={`notebook-li ${this.selected(notebook.id)}`}
        key={notebook.id}
        onClick={() => this.props.setNotebook(notebook.id)}>
        {notebook.name}
      </li>
    ));
  };


  render(){
    return(
      <div className='note-menu-bar'>MENUBAR
        <div className='notebook-popup'>
          <ul>
            {this.notebooksList()}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    notebooks: values(state.entities.notebooks)
  };
};

const mapDispatch = dispatch => {
  return {
    fetchNotebooks: () => dispatch(fetchNotebooks())
  };
};

export default connect(mapState,mapDispatch)(MenuBar)

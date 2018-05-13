import React from 'react';
import NotebookSelector from './notebook';
import TagSelector from './tags';
import pull from 'lodash/pull'

export default class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:'',
      notebook_id: null,
      tags: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNotebook = this.setNotebook.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
  }

  componentDidMount(){
    if (!this.props.note) this.props.history.push('/home');
    this.props.onMount(this.props.match.params.noteId);
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.note) return this.props.history.push('/home');
    if (nextProps.note.id !== +this.props.match.params.noteId){
      this.props.onMount(this.props.match.params.noteId);
    } else {
      this.setState(nextProps.note)
    }
  }

  update(field){
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.action(this.state)
      .then(action => this.props.history.push(`/home/${action.note.id}`));
  }

  setNotebook(id){
    this.setState({notebook_id: id});
  }


///////////////////////////////////////////////////
  toggleTag(id){
    console.log('triggered');
    const tags = Object.assign({},this.state.tags);
    if (tags[id]){
      delete tags[id];
    }else{
      tags[id] = true;
    }
    this.setState({ tags });
  }
  /////////////////////////////////////////////////

  render(){
    return(
      <div className='text-editor-pane'>

        <div className='text-editor-header'>

          <div className='note-main-options'>
          </div>

          <div
            className='button accent'
            onClick={this.handleSubmit}
            style={{
              width:'120px',
              marginLeft:'10px',
              position:'absolute',
              right:'10px',
              padding:'0px'}}>
              {this.props.formType}
            </div>

            <div className='note-menu-bar'>
                <NotebookSelector
                  setNotebook={this.setNotebook}
                  notebookId={this.state.notebook_id}/>

                <TagSelector
                  toggleTag={this.toggleTag}
                  selectedTags={this.state.tags}/>
            </div>

        </div>

        <div className='text-editor-content'>
          <form className='text-editor-field' onSubmit={this.handleSubmit}>
            <input
              type='text'
              className='editor-note-title'
              value={this.state.title}
              onChange={this.update('title')}/>
            <textarea
              className='editor-note-body'
              onChange={this.update('body')}
              value={this.state.body}/>
          </form>
        </div>
      </div>
    );
  }
}

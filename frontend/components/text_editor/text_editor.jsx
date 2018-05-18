import React from 'react';
import NotebookSelector from './notebook';
import TagSelector from './tags';
import Quill from 'quill';
import { quillStartup } from './quill_startup';
import { Toolbar } from './toolbar'

const Delta = Quill.import('delta')

export default class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:"{\"richText\":{\"ops\":[{\"insert\":\"\\n\"}]},\"plainText\":\"\\n\"}",
      notebook_id: null,
      taggings: {},
      altered: false,
      change: new Delta(),
      selection: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaggings = this.handleTaggings.bind(this);
    this.setNotebook = this.setNotebook.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
  }

  redirect(){
    this.props.history.push('/home');
  }


  setupDeltaListener(){
    this.editor.on('text-change', delta => {
      this.setState({change: this.state.change.compose(delta)});
    });
  }

  setupAutosave(){
    setInterval(()=> {
      if (this.state.change.length() > 0){
        console.log('pizzarat');
        this.postToDatabase();
      }
    }, 5000)
  }

  setupControlledState(){
    this.editor.on('editor-change',()=>{
      const richText=this.editor.getContents();
      const plainText=this.editor.getText();
      this.setState({
        body: JSON.stringify({richText,plainText})
      });
    });
  }

  postToDatabase(){

    this.setState({
      change: new Delta(),
      selection: this.editor.getSelection()
    });

    return this.props.action({
      title: this.state.title,
      body: this.state.body,
      notebook_id: this.state.notebook_id,
      id: this.state.id
    })
  }


  componentDidMount(){
    if (!this.props.note) this.redirect();
    this.props.onMount(this.props.match.params.noteId);
    this.editor = quillStartup();
    this.setupDeltaListener();
    this.setupControlledState();
    if (this.props.formType==='Edit') this.setupAutosave();
  }


  componentWillReceiveProps(nextProps){
    const fetchedNote = nextProps.note;
    const prevId = +this.props.match.params.noteId;

    if (!fetchedNote) return this.redirect();
    if (fetchedNote.id !== prevId || this.state.altered === true){
      this.props.onMount(fetchedNote.id);
      this.setState({altered:false})
    } else {
      this.editor.setContents(JSON.parse(fetchedNote.body).richText);
      this.editor.setSelection(this.state.selection);
      this.setState(
        Object.assign({},fetchedNote,{
          taggings: nextProps.taggings,
          change: new Delta()
        }))
    }
  }


  handleSubmit(e){
    const prev = this.props.taggings;
    const next = this.state.taggings;

    e.preventDefault();

    this.postToDatabase()
      .then(action =>
        this.handleTaggings(prev, next, action.payload.note.id))
      .then(noteId => {
        if (!this.props.match.params.noteId){
          this.props.history.push(`/home/${noteId}`)
        }})
  }

  handleTaggings(prev, next, noteId){

    const prevTags = Object.keys(prev);
    const newTags = Object.keys(next);
    let altered = false;

    prevTags.forEach(tagId => {
      if (!next[tagId]){altered = true;
        this.props.deleteTagging(prev[tagId].id);
      }
    });

    newTags.forEach(tagId => {
      if (!prev[tagId]){
        altered = true;
        this.props.createTagging(+noteId, +tagId);
      }
    });

    this.setState({taggings: next, altered: altered})
    return noteId;
  }

  setNotebook(id){
    this.setState({notebook_id: id});
  }

  toggleTag(id){
    const taggings = Object.assign({},this.state.taggings);
    taggings[id] ? delete taggings[id] : taggings[id] = true;
    this.setState({ taggings });
  }

  update(field){
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  /////////////////////////////////////////////////

  render(){
    return(
      <div className='text-editor-pane'>
        <div className='text-editor-header'>

          <div
            className='button accent'
            onClick={this.handleSubmit}
            style={{
              width:'120px',
              marginLeft:'10px',
              position:'fixed',
              right:'20px',
              top: '5px',
              padding:'0px'}}>
              {this.props.formType}
            </div>

            <div className='note-menu-bar'>
                <NotebookSelector
                  setNotebook={this.setNotebook}
                  notebookId={this.state.notebook_id}/>

                <TagSelector
                  toggleTag={this.toggleTag}
                  taggings={this.state.taggings}/>

                <Toolbar />
            </div>
          </div>
          <div className='text-editor-content'>
            <input
              className='title-input'
              value={this.state.title}
              placeholder='Title your note'
              onChange={this.update('title')}/>
            <div id='editor'/>
            </div>
        </div>
    );
  }
}

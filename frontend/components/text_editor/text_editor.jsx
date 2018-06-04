import React from 'react';
import NotebookSelector from './notebook';
import TagSelector from './tags';
import Quill from 'quill';
import { quillStartup } from './quill_startup';
import { Toolbar } from './toolbar';
import ImgUpload from '../image_test';


const Delta = Quill.import('delta')

export default class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:'',
      notebook_id: null,
      taggings: {},
      change: new Delta(),
      selection: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaggings = this.handleTaggings.bind(this);
    this.setNotebook = this.setNotebook.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.embed = this.embed.bind(this)
  }

  redirect(){
    this.props.history.push(`/home/${this.props.match.params.notebookId}`);
  }


  setupAutosave(){
    setInterval(()=> {
      if (this.state.change.length() > 0){
        this.handleSubmit();
      }
    }, 5000)
  }

  setupControlledState(){
    this.editor.on('editor-change',()=>{
      this.setState({
        body: this.editor.getContents(),
        selection:this.editor.getSelection()
      });
    });
  }

  setupDeltaListener(){
    this.editor.on('text-change', delta => {
      this.setState({
        change: this.state.change.compose(delta)
      });
    });
  }

  postToDatabase(content){
    //TODO: add taggings to state
    const textObject = {
      plainText: this.editor.getText(),
      richText: this.editor.getContents()
    }

    return this.props.action({
      title: this.state.title,
      body: JSON.stringify(textObject),
      notebook_id: this.state.notebook_id,
      id: this.state.id
    })
  }

  handleSubmit(e){

    //TODO: update taggings reducer to receive single tag

    let imageFreeContent;
    let imagesToUpload;
    const prev = this.props.taggings;
    const next = this.state.taggings;
    let noteId;

    if (e) e.preventDefault();

    this.postToDatabase()
    .then(id => {noteId = id; this.handleTaggings(prev, next, noteId)})
    .then(() => {
      if (!this.props.match.params.noteId){
           this.props.history.push(`/home/${this.state.notebook_id}/${noteId}`)
         }})
  }

  handleTaggings(prev, next, noteId){

    const prevTags = Object.keys(prev);
    const newTags = Object.keys(next);

    console.log(prev,next);
    prevTags.forEach(tagId => {
      if (!next[tagId]){console.log(this.props.deleteTagging);this.props.deleteTagging(prev[tagId].id);}
    });

    newTags.forEach(tagId => {
      if (!prev[tagId]) this.props.createTagging({note_id: +noteId, tag_id: +tagId});
    });

    return noteId;
  }

  embed(url, location){
    const index = this.state.selection.index;
    this.editor.insertEmbed(location, 'image', url);
    this.editor.setSelection(index + 1);
  }

  unsavedWarning(){
    if (this.state.change.length() > 0) return (
      'Wait! Your latest changes have not been saved. Leave site?'
    );
  }







  componentDidMount(){
    this.editor = quillStartup();
    this.setupDeltaListener();
    this.setupControlledState();
    window.onbeforeunload = this.unsavedWarning;

    if (this.props.formType==='Edit'){
      this.setupAutosave();
      this.props.fetchNote(this.props.match.params.noteId).fail(this.redirect);
    }
  }


  componentWillReceiveProps(nextProps){
    const fetchedNote = nextProps.note;
    const prevId = +this.props.match.params.noteId;

    if (!fetchedNote) return this.redirect();
    if (fetchedNote.id !== prevId){
      this.props.fetchNote(fetchedNote.id);
    } else {
      //debugger
      ///
      if (!this.state.refresh){
      const contents = JSON.parse(fetchedNote.body).richText;
      this.editor.setContents(contents);
      this.editor.setSelection(this.state.selection);
      this.setState(
        Object.assign({},fetchedNote,{
          taggings: nextProps.taggings,
          change: new Delta(),
          images: nextProps.images,
        }))
      }else{this.setState({refresh: false})}
    }
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

                <Toolbar />

                <div onClick={()=>this.editor.focus()}>
                  <ImgUpload
                    embed = {this.embed}
                    index = {!this.state.selection || this.state.selection.index}/>
                </div>


            </div>

            <TagSelector
              toggleTag={this.toggleTag}
              taggings={this.state.taggings}/>


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

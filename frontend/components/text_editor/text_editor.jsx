import React from 'react';
import NotebookSelector from './notebook';
import TagSelector from './tags';
import Quill from 'quill';
import { quillStartup } from './quill_startup';
import { Toolbar } from './toolbar';
import ImgUpload from '../image_test';
import { createEmbed } from '../../utils/embeds';


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
      selection: null,
      images:[]
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaggings = this.handleTaggings.bind(this);
    this.setNotebook = this.setNotebook.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.addImageToState = this.addImageToState.bind(this);
  }

  redirect(){
    console.log('redirecting');
    this.props.history.push(`/home/${this.props.match.params.notebookId}`);
  }


  setupDeltaListener(){
    this.editor.on('text-change', delta => {
      this.setState({
        change: this.state.change.compose(delta)
      });
    });
  }


  addImageToState(image){
    const images = this.state.images.slice();
    image = Object.assign(image,{index_location: this.state.selection.index})
    images.push(image);
    this.setState({ images });
    this.editor.insertEmbed(image.index_location, 'image', image.imageUrl);
  }

  setupAutosave(){
    setInterval(()=> {
      if (this.state.change.length() > 0){
        this.postToDatabase();
      }
    }, 5000)
  }

  setupControlledState(){
    this.editor.on('editor-change',()=>{
      const richText=this.editor.getContents();
      const plainText=this.editor.getText();
      this.setState({
        body: JSON.stringify({richText,plainText}),
        selection:this.editor.getSelection()
      });
    });
    //TODO is this performant? When you fetch can you just parse the JSON and
    //only deal with parsed rich text body in the state?
  }


  saveImage(image){
    const formData = new FormData();
    formData.append('embed[index_location]', image.index_location);
    formData.append('embed[note_id]', image.note_id);
    formData.append('embed[image]', image.imageFile);
    createEmbed(formData)
  }







  postToDatabase(){
    //TODO clean this up
    //TODO differentiate between existing images and new images
    //can we somehow move these supporting resource posters to the child components...?
    this.setState({
      change: new Delta(),
    });

    const imagesToUpload = [];

    let index = 0;
    let imageFreeContent = this.editor.getContents().filter(op => {
      if (op.insert.image){
        const image = this.state.images.find(image => image.imageUrl === op.insert.image);
        imagesToUpload.push({
          imageFile: image.imageFile,
          index_location: index
        });
        index++;
        console.log(imagesToUpload);
        return false;
      }
      index += op.insert.length;
      return true;
    });


    console.log('content', imageFreeContent, 'images', imagesToUpload);
    const textObject = {
      plainText: this.editor.getText(),
      richText: imageFreeContent
    }
    this.props.action({
      title: this.state.title,
      body: JSON.stringify(textObject),
      notebook_id: this.state.notebook_id,
      id: this.state.id
    }).then(action => {
      const note_id = action.payload.note.id;
      imagesToUpload.forEach(image=>{
        image.note_id = note_id;
        this.saveImage(image)
      });
      return action;
    })
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
    if (fetchedNote.id !== prevId || this.state.altered === true){
      this.props.fetchNote(fetchedNote.id);
      this.setState({altered:false})
    } else {
      this.editor.setContents(JSON.parse(fetchedNote.body).richText);
      console.log(fetchedNote.images);
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
    const notebookId = this.state.notebook_id;

    e.preventDefault();

    this.postToDatabase()
      .then(action =>
        this.handleTaggings(prev, next, action.payload.note.id))
      .then(noteId => {
        if (!this.props.match.params.noteId){
          this.props.history.push(`/home/${notebookId}/${noteId}`)
        }})
  }

  handleTaggings(prev, next, noteId){

    const prevTags = Object.keys(prev);
    const newTags = Object.keys(next);
    let altered = false;

    prevTags.forEach(tagId => {
      if (!next[tagId]){
        altered = true;
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
                <ImgUpload
                  addImageToState = {this.addImageToState}/>
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

import React from 'react';
import NotebookSelector from './notebook';
import TagSelector from './tags';
import Quill from 'quill';
import { quillStartup } from './quill_startup';
import { Toolbar } from './toolbar';
import ImgUpload from '../image_test';
import { createEmbed, updateEmbed } from '../../utils/embeds';


const Delta = Quill.import('delta')

export default class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:"{\"richText\":{\"ops\":[{\"insert\":\"\\n\"}]},\"plainText\":\"\\n\"}",
      notebook_id: null,
      taggings: {},
      change: new Delta(),
      selection: null,
      images:[],
      refresh: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaggings = this.handleTaggings.bind(this);
    this.setNotebook = this.setNotebook.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.addImageToState = this.addImageToState.bind(this);
    this.embed = this.embed.bind(this)
  }

  redirect(){
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
    this.setState({ images, refresh:true });
    this.editor.insertEmbed(image.index_location, 'image', image.imageUrl);
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
    return this.props.createEmbed(formData)
  }









  postToDatabase(imageFreeContent){
    //TODO clean this up
    //TODO differentiate between existing images and new images
    //TODO how will you delete images?
    //can we somehow move these supporting resource posters to the child components...?

    const textObject = {
      plainText: this.editor.getText(),
      richText: imageFreeContent
    }

    return this.props.action({
      title: this.state.title,
      body: JSON.stringify(textObject),
      notebook_id: this.state.notebook_id,
      id: this.state.id
    })
  }


  postImages(imagesToUpload, noteId){
    imagesToUpload.forEach(image=>{
      image.note_id = noteId;
      this.saveImage(image)
    });
  }


  handleSubmit(e){

    //TODO: You're now adding embeds and taggings by themselves, not just with a note.
    //need to update the reducers to reflect this.

    let imageFreeContent;
    let imagesToUpload;
    const prev = this.props.taggings;
    const next = this.state.taggings;
    let noteId;

    if (e) e.preventDefault();


    [imageFreeContent, imagesToUpload] = this.handleImages();
    this.postToDatabase(imageFreeContent)
    .then(id => {noteId = id; this.handleTaggings(prev, next, noteId)})
    .then(() => {

      this.postImages(imagesToUpload, noteId)
    })
    .then(() => {

      if (!this.props.match.params.noteId){
           this.props.history.push(`/home/${this.state.notebook_id}/${noteId}`)
         }})
  }

  handleTaggings(prev, next, noteId){

    const prevTags = Object.keys(prev);
    const newTags = Object.keys(next);

    prevTags.forEach(tagId => {
      if (!next[tagId]) this.props.deleteTagging(prev[tagId].id);
    });

    newTags.forEach(tagId => {
      if (!prev[tagId]) this.props.createTagging(+noteId, +tagId);
    });

    return noteId;
  }

  handleImages(){
    const imagesToUpload = [];
    let index = 0;

    let imageFreeContent = new Delta(this.editor.getContents()).filter(op => {
      if (op.insert.image){
        const image = this.state.images.find(
          image => image.imageUrl === op.insert.image);
          console.log(image);
        if (image.id){
          image.index_location = index;
          updateEmbed(image);
          return false;
        }else{
          imagesToUpload.push({
            imageFile: image.imageFile,
            index_location: index,
          });
          return false;
        }
        index++;
      }
      index += op.insert.length;
      return true;
    });

    return [imageFreeContent, imagesToUpload];
  }





  embed(url, location){
    this.editor.insertEmbed(location, 'image', url)
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
      nextProps.images.forEach(image=>this.editor.insertEmbed(image.index_location, 'image', image.imageUrl))
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
    this.handleSubmit();
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
                  embed = {this.embed}
                  index = {!this.state.selection || this.state.selection.index}/>
                <NotebookSelector
                  setNotebook={this.setNotebook}
                  notebookId={this.state.notebook_id}
                  submit={this.handleSubmit}/>

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

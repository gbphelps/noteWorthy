import React from 'react';
import NotebookSelector from './notebook';
import TagSelector from './tags';
import Quill from 'quill';
import { quillStartup } from './quill_startup';
import { Toolbar } from './toolbar';
import ImgUpload from './image_upload';
import { createTagging } from '../../utils/taggings'




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
      pending: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaggings = this.handleTaggings.bind(this);
    this.setNotebook = this.setNotebook.bind(this);
    this.toggleTag = this.toggleTag.bind(this);
    this.embed = this.embed.bind(this)
  }

  redirect(){
    this.props.history.push(`/home/${this.props.match.params.notebookId || 'inbox'}`);
  }

  setupAutosave(){
    window.debounce = setInterval(()=> {
      if (this.state.change.length() > 0){
        this.handleSubmit();
      }
    }, 1000)
  }

  setupControlledState(){
    this.editor.on('text-change', delta => {
      this.setState({
        body: this.editor.getContents(),
        change: this.state.change.compose(delta),
      });
    });
  }

  postToDatabase(options){

    if (!options) options = {};

    const textObject = {
      plainText: this.editor.getText(),
      richText: this.editor.getContents()
    }

    return this.props.action({
      title: options.title || this.state.title,
      body: JSON.stringify(textObject),
      notebook_id: options.notebook || this.state.notebook_id,
      id: this.state.id
    })
  }


  animate(id){
    if (this.props.formType === 'Create') this.props.animateIn(id);
    return id;
  }


  //TODO: if it's CREATE NOTE, you need to do an unsaved warning with the react router.
  //TODO: You need to stay on the /tags/${id} page after you've clicked on a note on that page!
  //Don't navigate back to inbox.
  handleSubmit(e){
    let imageFreeContent;
    let imagesToUpload;
    const taggings = Object.keys(this.state.taggings);

    if (this.props.formType === 'Create') clearInterval(debounce);

    if (e) e.preventDefault();

    this.postToDatabase()
    .then(id => this.handleTaggings(taggings, id))
    .then(id => {
      if (!this.props.match.params.noteId){
           this.props.history.push(`/home/${this.state.notebook_id || 'inbox'}/${id}`)
         }})
  }

  handleTaggings(taggings, noteId){
    if (this.props.formType === 'Create'){
      taggings.forEach(tagId =>
        createTagging({note_id: +noteId, tag_id: +tagId}));
    }
    return noteId;
  }

  embed(url, location){
    const index = this.editor.getSelection().index;
    this.editor.insertEmbed(index, 'image', url);
    this.editor.setSelection(index + 1);
  }

  unsavedWarning(){
    if (this.state.change.length() > 0) return (
      'Wait! Your latest changes have not been saved. Leave site?'
    );
  }







  componentDidMount(){
    this.editor = quillStartup();
    this.setupControlledState();
    window.onbeforeunload = this.unsavedWarning;

    // if (this.props.formType==='Edit'){
      this.setupAutosave();
      this.setState(Object.assign({}, this.props.note, {pending:true}))

      if (this.props.formType==='Edit'){
        this.props.fetchNote(this.props.match.params.noteId)
        .fail(this.redirect)
      }
    // }
  }



  nbFromRouter(props){
    if (this.props.formType === 'Create'){
      const id = props.match.params.notebookId;
      if (id === 'inbox') return null;
      return id;
    }
    return this.state.notebook_id
  }

  componentWillReceiveProps(nextProps){
    const fetchedNote = nextProps.note;
    const prevId = +this.props.match.params.noteId;
    const displayedId = this.props.note ? this.props.note.id : null;

    if (!fetchedNote){
      this.redirect();

    } else if (displayedId === null || fetchedNote.id !== prevId) {
      this.props.fetchNote(fetchedNote.id);
      this.setState({pending: true, notebook_id: this.nbFromRouter(nextProps)})

    } else if (fetchedNote.id === displayedId && this.state.pending === false) {
      this.setState({change: new Delta()})

    } else {
      const contents = JSON.parse(fetchedNote.body).richText;
      this.editor.setContents(contents);
      this.setState(
        Object.assign(
          {},
          fetchedNote,{
            taggings: nextProps.taggings,
            change: new Delta(),
            pending: false,
          }))
    }
}

  setNotebook(id){
    if (this.props.formType === 'Edit') this.postToDatabase({ notebook: id });
    this.setState({notebook_id: id});
  }

  toggleTag(id){
    const taggings = Object.assign({},this.state.taggings);
    taggings[id] ? delete taggings[id] : taggings[id] = true;
    if (this.props.formType === 'Edit'){
      if (taggings[id]) this.props.createTagging({note_id: +this.props.match.params.noteId, tag_id: id});
      if (!taggings[id]) this.props.deleteTagging(this.props.taggings[id].id)
    }
    this.setState({ taggings });
  }

  updateTitle(){
    return e => {
      this.setState({title: e.target.value},()=>this.handleSubmit());
    };
  }




  /////////////////////////////////////////////////

  render(){
    return(
      <div className='text-editor-pane'>
        <div className='text-editor-header'>

          <TagSelector
            toggleTag={this.toggleTag}
            taggings={this.state.taggings}/>

            <div className='note-menu-bar'>

              <div style={{position:'relative',top:'2px',marginLeft:'5px'}}>
                <img src={window.notebookSmall}/>
              </div>

              <NotebookSelector
                setNotebook={this.setNotebook}
                notebookId={this.state.notebook_id}/>

                <Toolbar />

                <div onClick={()=>this.editor.focus()}>
                  <ImgUpload embed = {this.embed}/>
                </div>


            </div>




          </div>
          <div className='text-editor-content'>
            <input
              className='title-input'
              value={this.state.title}
              placeholder='Title your note'
              onChange={this.updateTitle()}/>
            <div id='editor'/>
          </div>
        </div>
    );
  }
}

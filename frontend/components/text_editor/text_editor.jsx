import React from 'react';

export default class TextEditor extends React.Component{
  constructor(props){
    super(props);
    this.state={title:'',body:''}
    this.handleSubmit=this.handleSubmit.bind(this);
    this.listen = null;
  }

  componentDidMount(){
    if (!this.props.note) this.props.history.push('/home');
    // if (this.props.formType === 'Edit'){
    //   this.listen = setInterval(()=>this.props.action(this.state),5000);
    // };
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
    this.props.action(this.state).then(note => this.props.history.push(`/home/${note.id}`));
  }

  render(){
    return(
      <div className='text-editor-pane'>

        <div className='text-editor-header'>
        <button onClick={this.handleSubmit}>Submit</button>
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

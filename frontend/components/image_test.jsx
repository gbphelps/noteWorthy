import React from 'react';

import { createEmbed } from '../utils/embeds';



class Test extends React.Component {
  constructor(props){
    super(props)
    this.state={
      imageFile: null,
      imageUrl: null,
      index_location: 20,
      note_id: 20
    }
    this.updateFile = this.updateFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  updateFile(e){
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.props.addImageToState({
        imageFile: file,
        imageUrl: fileReader.result
      });
    };

    if (file){
      fileReader.readAsDataURL(file);
    }
  }



  handleSubmit(e){
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('embed[index_location]', this.state.index_location);
    // formData.append('embed[note_id]', this.state.note_id);
    // formData.append('embed[image]', this.state.imageFile);
    // console.log(formData);
    // createEmbed(formData)
    //This will go to the parent: editor!
  }



  render(){
    return (
      <div>
        <div className='button' onClick={this.handleSubmit}/>
        <input type='file' onChange={this.updateFile}/>
        <img src={this.state.imageUrl}/>
      </div>
    );
  }
}


export default Test

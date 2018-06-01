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
    this.uploadFile = this.uploadFile.bind(this);
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


  uploadFile(e){
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append('embed[image]', file);
    createEmbed(formData).then(image => this.props.embed(image.imageUrl, this.props.index));
  }

  render(){
    return (
      <div>
        <input type='file' onChange={this.uploadFile}/>
      </div>
    );
  }
}


export default Test

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


  render(){
    return (
      <div>
        <input type='file' onChange={this.updateFile}/>
        <img src={this.state.imageUrl}/>
      </div>
    );
  }
}


export default Test

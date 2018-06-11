import React from 'react';

import { createEmbed } from '../../utils/embeds';



class Test extends React.Component {
  constructor(props){
    super(props)
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile(e){
    //TODO you probably want to grab the preview here, and also grab the index at this point.
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const formData = new FormData();
    formData.append('embed[image]', file);
    createEmbed(formData).then(image => this.props.embed(image.imageUrl, this.props.index));
    document.getElementById('file').value = "";

    ///TODO you're double-uploading with the code below; need to replace the preview with the AWS version when ready -
    //use promises. Need a way to keep track of the correct index, even if the user has continued
    //to type
    // const reader = new FileReader();
    // const file = e.currentTarget.files[0];
    // const formData = new FormData();
    // formData.append('embed[image]', file);
    // createEmbed(formData).then(image => this.props.embed(image.imageUrl, this.props.index));
    // let preview;
    // reader.onloadend = () =>{
    //   preview = reader.result;
    //   this.props.embed(preview, this.props.index)
    // }
    //
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
    ///
  }

  render(){
    return (
      <div>
        <input id='file' type='file' onChange={this.uploadFile} style={{display:'none'}}/>
        <label htmlFor='file'>
          <i
            className="far fa-image"
            style={{
              fontSize:'20px',
              cursor:'pointer',
              position:'relative',
              top:'2px'
            }}/>
        </label>
      </div>
    );
  }
}


export default Test

import React from 'react';

import { createEmbed } from '../../utils/embeds';



class Test extends React.Component {
  constructor(props){
    super(props)
    this.uploadFile = this.uploadFile.bind(this);
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
        <input id='file' type='file' onChange={this.uploadFile} style={{display:'none'}}/>
        <label htmlFor='file'>
          <i
            className="far fa-image"
            style={{
              fontSize:'20px',
              color:'#444',
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

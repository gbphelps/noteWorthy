import React from 'react';
import { fetchEmbeds } from '../actions/embeds';
import { createEmbed } from '../utils/embeds';
import { connect } from 'react-redux';
import values from 'lodash/values';

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

  componentDidMount(){
    this.props.fetchEmbeds();
  }

  updateFile(e){
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        imageFile: file,
        imageUrl: fileReader.result
      });
      console.log(this.state);
    };

    if (file){
      fileReader.readAsDataURL(file);
    }
  }



  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('embed[index_location]', this.state.index_location);
    formData.append('embed[note_id]', this.state.note_id);
    formData.append('embed[image]', this.state.imageFile);
    console.log(formData);
    createEmbed(formData)
  }

  images(){
    return values(this.props.embeds).map(embed => <img src={embed.url}></img>
    );
  }

  render(){
    return (
      <div>{this.images()}
        <div className='button' onClick={this.handleSubmit}/>
        <input type='file' onChange={this.updateFile}/>
        <img src={this.state.imageUrl}/>
      </div>
    );
  }
}

const mapState = state => {
  return {
    embeds: state.entities.embeds
  };
};

const mapDispatch = dispatch => {
  return {
    fetchEmbeds: () => dispatch(fetchEmbeds())
  };
};

export default connect(mapState,mapDispatch)(Test)

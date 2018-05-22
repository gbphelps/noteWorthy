import React from 'react';
import { fetchEmbeds } from '../actions/embeds';
import { connect } from 'react-redux';
import values from 'lodash/values';

class Test extends React.Component {
  constructor(props){
    super(props)
    this.state={
      imageFile: null,
      imageUrl: null,
      index_location: null,
      note_id: null
    }
    this.updateFile = this.updateFile.bind(this)
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
    };

    if (file){
      fileReader.readAsDataURL(file);
    }
  }

  images(){
    return values(this.props.embeds).map(embed => <img src={embed.url}></img>
    );
  }

  render(){
    return (
      <div>{this.images()}
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

import React from 'react';
import { fetchEmbeds } from '../actions/embeds';
import { connect } from 'react-redux';
import values from 'lodash/values';

class Test extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchEmbeds();
  }

  images(){
    return values(this.props.embeds).map(embed => <img src={embed.url}></img>
    );
  }

  render(){
    return (
      <div>{this.images()}</div>
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

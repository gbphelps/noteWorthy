import React from 'react';
import { connect } from 'react-redux';
import { fetchTags, createTag } from '../../actions/tags';
import values from 'lodash/values';
import { CSSTransitionGroup } from 'react-transition-group';


//TODO: Change popups to conditional render

class TagSelector extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount(){
    this.props.fetchTags();
  }




  selected(id){
    return this.props.taggings[id] ?
    'selected' : '';
  }

  taggings(){
    const list = [];
    values(this.props.tags).forEach(tag => {
      if (this.props.taggings[tag.id]) list.unshift(
        <li
          key={ tag.id }
          className='tag-li'>
          <span className='tag-name'>{ tag.name }</span>
          <span
            onClick={()=>this.props.toggleTag(tag.id)}
            style={{cursor:'pointer',margin:'0 5px 0 0'}}> &#215;</span>
        </li>
      )
    })
    return list
  }

  tagsList(){
    const list = [];
    values(this.props.tags).forEach(tag => {
      if (this.state.name &&
          !this.props.taggings[tag.id] &&
          tag.name.indexOf(this.state.name)===0){
      list.unshift(
        <li
          onClick={()=>{this.props.toggleTag(tag.id);this.clear()}}
          className={`note-li ${this.selected(tag.id)}`}
          key={tag.id}>
          {tag.name}
        </li>
      )}
    });
    return list;
  }

  tagNames(){
    return values(this.props.tags).map(tag => tag.name);
  }


  clear(){
    this.setState({name: ''})
  }

  handleSubmit(e){
    e.preventDefault();
    const index = this.tagNames().indexOf(this.state.name);
    if (index === -1){
      this.props.createTag(this.state)
      .then(action=>this.props.toggleTag(action.tag.id))
    }else{
      this.props.toggleTag(values(this.props.tags)[index].id)
    }
    this.clear();
  }

  updateName(e){
    this.setState({name: e.target.value});
  }

  render(){
    return(
      <div style={{flexShrink:'0'}}>
        <div className='tag-holder' style={{float:'left'}}>
          <div style={{position:'relative',top:'4px',marginLeft:'5px'}}><img src={window.tagSmall}/></div>
          <ul className='current-taggings'>{this.taggings()}</ul>
        </div>
        <form
            className='tag-form'
            onSubmit={this.handleSubmit}>
            <input className='tag-entry'
              onChange={this.updateName}
              placeholder='+'
              value={this.state.name}
              size={this.state.name.length || 1}/>
            {this.tagsList().length ? (<ul className='tag-options'>{this.tagsList()}</ul>) : ''}
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tags: state.entities.tags, //remember that these are object form still
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTags: () => dispatch(fetchTags()),
    createTag: tag => dispatch(createTag(tag))
  };
};

export default connect(mapState,mapDispatch)(TagSelector);

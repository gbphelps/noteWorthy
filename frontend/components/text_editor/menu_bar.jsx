import React from 'react'

export default class MenuBar extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    return(
      <div className='note-menu-bar'>MENUBAR
        <div className='notebook-popup'/>
      </div>
    );
  }
}

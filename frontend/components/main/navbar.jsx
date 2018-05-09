import React from 'react';

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }


  popup(text,icon){
    return(
      <div className={icon}>
        <div className='popup'>
          <img className='popup-arrow' src={popupTail}/>
          <div className='popup-body'>{text}</div>
        </div>
      </div>
    );
  }

  render(){
    return(
      <div className='left-nav'>
        <img className='icon-elephant' src={elephantSmall}/>

        <nav className='upper-nav'>
          {this.popup('New Note','icon plus')}
          {this.popup('New Meeting Note', 'icon mtgnote')}
          {this.popup('Search', 'icon search')}
        </nav>

        <nav className='lower-nav'>

          {this.popup('Shortcuts', 'icon star')}
          {this.popup('Notes', 'icon note')}
          {this.popup('Notebooks', 'icon notebook')}
          {this.popup('Tags', 'icon tag')}

        </nav>
      </div>
    );
  }
}

import React from 'react';

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className='left-nav'>
        <img className='icon-elephant' src={elephantSmall}/>
        <nav className='upper-nav'>

          <div className='icon plus'>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>New note</div>
            </div>
          </div>

          <div className='icon mtgnote'>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>New meeting note</div>
            </div>
          </div>

          <div className='icon search'>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>Search</div>
            </div>
          </div>

        </nav>

        <nav className='lower-nav'>

          <div className='icon star'>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>Shortcuts</div>
            </div>
          </div>

          <div className='icon note'>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>Notes</div>
            </div>
          </div>

          <div className='icon notebook'>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>Notebooks</div>
            </div>
          </div>

          <div className='icon tag'>
            <div className='popup'>
              <img className='popup-arrow' src={popupTail}/>
              <div className='popup-body'>Tags</div>
            </div>
          </div>

        </nav>
      </div>
    );
  }
}

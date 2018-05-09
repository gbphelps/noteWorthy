import React from 'react'

export default class NotesPane extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className="pane-notes">
          <nav className="pane-header">
            <div>Notes</div>
            <div className='pane-subhead'>
              <div>7 notes</div>
              <div className='options'>Options<img className='tiny pointer' src={downSmall}></img>
                <div className="options-popup"></div>
              </div>
            </div>
          </nav>
          <div className="pane-content">
              <div className="reminders">
                <div className='reminders-header'>
                  <div><img className='right-pointer' src={rightArrow}></img>Reminders</div>
                  <div className="reminders-counter">1<img className='reminder-icon' src={reminder}></img>
                    <div className='reminders-popup'></div>
                  </div>
                </div>
              </div>
              <div className="note-body">
              </div>

              <div className="note-body">
              </div>

              <div className="note-body">
              </div>

              <div className="note-body">
              </div>

              <div className="note-body">
              </div>

              <div className="note-body">
              </div>

              <div className="note-body">
              </div>

              <div className="note-body">
              </div>

              <div className="note-body">
              </div>
          </div>
      </div>
    );
  }
}

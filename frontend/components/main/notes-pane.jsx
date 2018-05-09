import React from 'react'

class NotesPane extends React.Component {
  constructor(){
    super(props);
    this.state = {};
  }

  render(){
    <div className="pane-notes">
        <nav className="pane-header">
          <h1>Notes</h1>
          <div className='pane-subhead'>
            <div>7 notes</div>
            <div className='options'>Options<img className='tiny pointer' src='./images/arrows/tiny_down_pointer.png'></img>
              <div className="options-popup"></div>
            </div>
          </div>
        </nav>
        <div className="pane-content">
            <div className="reminders">
              <div className='reminders-header'>
                <div><img className='right-pointer' src='./images/arrows/right_pointer.png'></img>Reminders</div>
                <div className="reminders-counter">1<img className='reminder-icon' src='./images/reminder.png'></img>
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
  }
}

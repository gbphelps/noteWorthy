import React from 'react';
import { withRouter } from 'react-router-dom';


let NoteOptions = (props) => {
 return(
   <div className='note-options'>
     <div className='note-icon note-share'></div>
     <div className='note-icon note-reminder'></div>
     <div className='note-icon note-star'></div>
     <div className='note-icon note-trash'
          onClick={(e) => {
            props.deleteNote(props.note.id);}}>
     </div>
   </div>
 );
};

export default withRouter(NoteOptions)


//setTimeout(() => props.deleteNote(props.note.id),1000)

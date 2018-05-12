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
            props.collapse();
            setTimeout(() => props.deleteNote(props.note.id),1000)}}>
     </div>
   </div>
 );
};

export default withRouter(NoteOptions)

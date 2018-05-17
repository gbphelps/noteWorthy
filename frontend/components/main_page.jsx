import NavBar from './navbar/navbar';
import NotesPane from './notes_pane/notes_pane';
import NotebooksPane from './notebooks_pane/notebooks_pane'
import SearchPane from './notebooks_pane/search'
import CreateNote from './text_editor/create_note';
import EditNote from './text_editor/edit_note';
import { ProtectedRoute } from '../utils/protected_route';
import React from 'react';

export const Main = () => {
  return (
    <div className='main'>
      <NavBar />
      <NotesPane />
        <ProtectedRoute
          path='/home'
          exact={true}
          component={CreateNote}/>
        <ProtectedRoute
          path='/home/:noteId'
          exact={true}
          component={EditNote}/>
        <NotebooksPane />
        <SearchPane />
    </div>
  );
}

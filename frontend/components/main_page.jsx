import NavBar from './navbar/navbar';

import NotesPane from './notes_pane/notes_pane';
import NotebooksPane from './sliding_panes/notebooks_pane';
import SearchPane from './sliding_panes/search';
import ShortcutsPane from './sliding_panes/shortcuts'

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
          path='/home/:notebookId'
          exact={true}
          component={CreateNote}/>
        <ProtectedRoute
          path='/home/:notebookId/:noteId'
          exact={true}
          component={EditNote}/>
        <NotebooksPane />
        <SearchPane />
        <ShortcutsPane />
    </div>
  );
}

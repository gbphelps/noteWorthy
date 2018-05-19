import React from 'react';
import { Provider } from 'react-redux';
import Login from './session_components/login_form_container';
import Signup from './session_components/signup_form_container';
import { AuthRoute } from '../utils/login_route';
import { ProtectedRoute } from '../utils/protected_route';
import NavBar from './navbar/navbar';
import NotesPane from './notes_pane/notes_pane';
import CreateNote from './text_editor/create_note';
import UpdateNote from './text_editor/edit_note';
import { Main } from './main_page'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


export const App = () => {

  return (
    <div className='app'>
      <ProtectedRoute
        path = '/home/:notebookId'
        exact = {false}
        component = {Main}/>
      <AuthRoute
        component = {Signup}
        path = '/signup'
        exact = {true} />
      <AuthRoute
        component = {Login}
        path = '/'
        exact = {true} />
    </div>
  );
};

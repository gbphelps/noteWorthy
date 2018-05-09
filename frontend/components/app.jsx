import React from 'react';
import { Provider } from 'react-redux';
import Login from './session_components/login_form_container';
import Signup from './session_components/signup_form_container';
import Greeting from './greeting';

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';


export const App = () => {
  return (
    <div>
      <div>Feel free to click anywhere on the page</div>
        <Greeting/>
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
    </div>
  );
};

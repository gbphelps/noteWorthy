import React from 'react';
import { Provider } from 'react-redux';
import Login from './session_components/login_form_container';
import Signup from './session_components/signup_form_container';
import { AuthRoute } from '../utils/route_util';
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
        <AuthRoute
          component = {Signup}
          path = '/signup'
          exact = {true} />
        <AuthRoute
          component = {Login}
          path = '/login'
          exact = {true} />
    </div>
  );
};

import React from 'react';
import { Provider } from 'react-redux';
import Login from './session_components/login_form_container';
import Signup from './session_components/signup_form_container';
import Greeting from './greeting'
import { AuthRoute } from '../utils/login_route';
import { ProtectedRoute } from '../utils/protected_route'

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
      <ProtectedRoute
        component = {Greeting}
        path = '/'
        exact = {true}/>
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

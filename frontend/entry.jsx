import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './components/root';
import { configureStore } from './store/store';

document.addEventListener('DOMContentLoaded',()=>{
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: currentUser
    };
    store = configureStore(preloadedState);
  }else{
    store = configureStore();
  }
  ///////////////////////////////
  window.dispatch = store.dispatch;
  ///////////////////////////////
  ReactDOM.render(<Root store = {store} />, root);
});

import * as a from './utils/notebooks';
window.a = a;

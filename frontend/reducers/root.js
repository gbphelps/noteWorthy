import { combineReducers } from 'redux';
import { session } from './session';
import ui from './ui'
import entities from './entities'
import errors from './errors';

export default combineReducers({ session, errors, entities, ui });

import notes from './notes';
import { combineReducers } from 'redux';
import notebooks from './notebooks';
import tags from './tags';
import taggings from './taggings';


export default combineReducers({ notes, notebooks, tags, taggings });

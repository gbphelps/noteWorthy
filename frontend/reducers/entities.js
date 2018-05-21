import notes from './notes';
import { combineReducers } from 'redux';
import notebooks from './notebooks';
import tags from './tags';
import taggings from './taggings';
import shortcuts from './shortcuts';
import embeds from './embeds'


export default combineReducers({ notes, notebooks, tags, taggings, shortcuts, embeds });

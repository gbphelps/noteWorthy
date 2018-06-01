import { RECEIVE_EMBEDS, RECEIVE_EMBED } from '../actions/embeds'
import { RECEIVE_NOTE } from '../actions/notes'
import merge from 'lodash/merge'

const embedsReducer = (state = [], action) => {
  switch(action.type){
    case RECEIVE_NOTE:
      return action.payload.images;
    case RECEIVE_EMBEDS:
      return action.embeds;
    case RECEIVE_EMBED:
      const next = state.slice();
      next.push(action.embed);
      return next;
    default:
      return state;
  }
}

export default embedsReducer;

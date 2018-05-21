import { RECEIVE_EMBEDS, RECEIVE_EMBED } from '../actions/embeds'
import merge from 'lodash/merge'

const embedsReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_EMBEDS:
      return action.embeds;
    case RECEIVE_EMBED:
      return merge({},state,{[action.embed.id]: action.embed});
    default:
      return state;
  }
}

export default embedsReducer;

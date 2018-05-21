import * as Api from '../utils/embeds'

export const RECEIVE_EMBEDS = 'RECEIVE_EMBEDS';
const RECEIVE_EMBED = 'RECEIVE_EMBED';


export const receiveEmbeds = embeds => {
  return {
    type: RECEIVE_EMBEDS,
    embeds
  }
}

export const receiveEmbed = embed => {
  return {
    type: RECEIVE_EMBED,
    embed
  }
}

export const fetchEmbeds = () => dispatch => {
  Api.fetchEmbeds()
    .then(embeds => dispatch(receiveEmbeds(embeds)));
};

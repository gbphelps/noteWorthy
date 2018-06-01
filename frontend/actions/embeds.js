import * as Api from '../utils/embeds'

export const RECEIVE_EMBEDS = 'RECEIVE_EMBEDS';
export const RECEIVE_EMBED = 'RECEIVE_EMBED';


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

export const fetchEmbeds = (id) => dispatch => {
  Api.fetchEmbeds(id)
    .then(embeds => dispatch(receiveEmbeds(embeds)));
};


export const createEmbed = (embed) => dispatch => {
  return Api.createEmbed(embed)
    .then(embed => dispatch(receiveEmbed(embed)));
};

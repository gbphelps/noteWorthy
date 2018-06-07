import * as Api from '../utils/taggings'

export const RECEIVE_TAGGING = 'RECEIVE_TAGGING';
export const REMOVE_TAGGING = 'REMOVE_TAGGING';

export const receiveTagging = tagging => {
  return {
    type: RECEIVE_TAGGING,
    tagging
  }
}

export const removeTagging = tagging => {
  return {
    type: REMOVE_TAGGING,
    tagging
  }
}

export const deleteTagging = id => dispatch => {
  return Api.deleteTagging(id)
    .then(tagging => {dispatch(removeTagging(tagging))})
}

export const createTagging = tagging => dispatch => {
  return Api.createTagging(tagging)
    .then(tagging => dispatch(receiveTagging(tagging)))
}



////////
export const RECEIVE_TAGGINGS = 'RECEIVE_TAGGINGS';
export const receiveTaggings = taggings => {
  return {
    type: RECEIVE_TAGGINGS,
    taggings
  }
}
export const fetchTaggings = () => dispatch => {
  return Api.fetchTaggings()
  .then(taggings => dispatch(receiveTaggings(taggings)))
}

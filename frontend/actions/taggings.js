
///TODO: do you need this? 
import * as Api from '../utils/taggings'

export const REMOVE_TAGGING = 'REMOVE_TAGGING'
export const RECEIVE_TAGGING = 'RECEIVE_TAGGING'

export const removeTagging = id => {
  return {
    type: REMOVE_TAGGING,
    id
  };
};

export const createTagging = tagging => {
  return {
    type: CREATE_TAGGING,
    tagging
  };
};

export const deleteTagging = id => dispatch => {
  return Api.deleteTagging(id).then(() => dispatch(removeTagging(id)));
};

export const createTagging = tagging => dispatch => {
  return Api.createTagging(tagging).then(tagging => dispatch(createTagging(tagging)));
};

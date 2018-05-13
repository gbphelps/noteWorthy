import * as Api from '../utils/tags'

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';

export const receiveTags = tags => {
  return {
    type: RECEIVE_TAGS,
    tags
  };
};

export const receiveTag = tag => {
  return {
    type: RECEIVE_TAG,
    tag
  };
};

export const removeTag = id => {
  return {
    type: REMOVE_TAG,
    id
  };
};


export const fetchTags = () => dispatch => {
  return Api.fetchTags().then(tags => dispatch(receiveTags(tags)));
}

export const createTag = tag => dispatch => {
  return Api.createTag(tag).then(tag => dispatch(receiveTag(tag)));
}

export const updateTag = tag => dispatch => {
  return Api.updateTag(tag).then(tag => dispatch(receiveTag(tag)));
}

export const deleteTag = id => dispatch => {
  return Api.deleteTag(id).then(()=> disaptch(removeTag(id)));
}

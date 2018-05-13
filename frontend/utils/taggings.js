export const createTagging = (noteId, tagId) => {
  return $.ajax({
    method: 'POST',
    url: 'api/taggings',
    data: {tagging: {
      note_id: noteId,
      tag_id: tagId
    }};
  });
};

export const deleteTagging = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/taggings/${id}`
  });
};

export const createTagging = tagging => {
  return $.ajax({
    method: 'POST',
    url: 'api/taggings',
    data: { tagging }
  });
};

export const deleteTagging = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/taggings/${id}`,
  });
};

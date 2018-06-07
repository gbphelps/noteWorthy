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

export const fetchTaggings = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/taggings'
  })
}

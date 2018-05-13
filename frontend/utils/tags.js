export const fetchTags = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/tags'
  });
};

export const createTag = tag => {
  return $.ajax({
    method: 'POST',
    url: 'api/tags'
  });
};


//NOTE: consider removing this along with controller action and route
//not sure you'll need this functionality
export const updateTag = tag => {
  return $.ajax({
    method: 'PATCH',
    url: `api/tags/${tag.id}`,
    data: { data }
  });
};
////



export const deleteTag = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/tags/${id}`
  });
};

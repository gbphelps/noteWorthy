export const fetchUser = id => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${id}`
  });
};

export const postUser = user => {
  return $.ajax({
    method: 'POST',
    url: 'api/users',
    data: { user }
  });
};

export const postSession = user => {
  return $.ajax({
    method: 'POST',
    url: 'api/session',
    data: { user }
  });
};

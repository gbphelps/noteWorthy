export const fetchNotes = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/notes'
  });
};

export const fetchNote = id => {
  return $.ajax({
    method: 'GET',
    url: `api/notes/${id}`
  });
};

export const postNote = note => {
  return $.ajax({
    method: 'POST',
    url 'api/notes'
  });
};

export const editNote = note => {
  return $.ajax({
    method: 'PATCH',
    url: `api/notes/${note.id}`,
    data: { note }
  });
};

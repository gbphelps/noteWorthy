export const fetchNotes = notebook_id => {
  return $.ajax({

  });
};

export const deleteNotebook = id => {
  return $.ajax({
    method: 'DELETE',
    url: `api/notebooks/${id}`
  });
};

export const createNotebook = notebook => {
  return $.ajax({
    method: 'POST',
    url: 'api/notebooks',
    data: { notebook }
  });
};

export const updateNotebook = notebook => {
  return $.ajax({
    method: 'PATCH',
    url: `api/notebooks/${notebook.id}`,
    data: { notebook }
  });
};

export const fetchNotebooks = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/notebooks'
  });
};

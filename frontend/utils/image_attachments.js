export const createImage = () => {
  return $.ajax({
    method: 'POST',
    url: 'api/attached_images',
    data: {image : {
      note_id: 2,
      index_location: 0,
    }}
  });
};

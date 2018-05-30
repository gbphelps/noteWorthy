export const createEmbed = (formData) => {
  return $.ajax({
    method: 'POST',
    url: 'api/embeds',
    dataType: 'json',
    contentType: false,
    processData: false,
    data: formData
  });
};

export const fetchEmbeds = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/embeds'
  });
};

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

export const updateEmbed = embed => {
  console.log(embed.index_location);
  return $.ajax({
    method: 'PATCH',
    url: `api/embeds/${embed.id}`,
    data: {embed: {index_location: embed.index_location}}
  })
}


export const fetchEmbeds = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/embeds'
  });
};
export const createEmbed = embed => {
  return $.ajax({
    method: 'POST',
    url: 'api/embeds',
    data: { embed }
  });
};

export const fetchEmbeds = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/embeds'
  });
};

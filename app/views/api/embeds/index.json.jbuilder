@embeds.each do |embed|
  json.set! embed.id do
    json.extract! embed, :id, :note_id, :index_location
    json.url image_url(embed.image.url)
  end
end

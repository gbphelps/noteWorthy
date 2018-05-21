@embeds.each do |embed|
  json.set! embed.id do
    json.extract! embed, :id, :note_id, :index_location
    json.url embed.image.url
  end
end

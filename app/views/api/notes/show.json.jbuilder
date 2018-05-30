
json.note do
  json.extract! @note, :id, :notebook_id, :title, :body, :updated_at, :created_at, :shortcut
end

json.taggings({})

json.taggings do
  @note.taggings.each do |tagging|
    json.set! tagging.tag_id do
      json.extract! tagging, :id
    end
  end
end


json.images @note.embeds do |embed|
  json.id embed.id
  json.imageUrl embed.image
  json.index_location embed.index_location
end

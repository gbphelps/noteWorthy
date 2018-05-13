
json.note do
  json.extract! @note, :id, :notebook_id, :title, :body, :updated_at, :created_at
end

json.taggings do
  @note.taggings.each do |tagging|
    json.set! tagging.tag_id do
      json.extract! tagging, :id
    end
  end
end

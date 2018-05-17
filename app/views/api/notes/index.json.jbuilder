@notes.each do |note|
  json.set! note.id do
    json.extract! note, :id, :notebook_id, :title, :body, :updated_at, :created_at, :shortcut
  end
end

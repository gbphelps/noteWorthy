@notes.each do |note|
  json.set! note.id do
    json.extract! note, :title, :body, :updated_at, :created_at
  end
end

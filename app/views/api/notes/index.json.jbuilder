@notes.each do |note|
  json.set! note.id do
    json.extract! note, :title, :body
  end
end
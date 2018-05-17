@notebooks.each do |notebook|
  json.set! notebook.id do
    json.extract! notebook, :id, :user_id, :name, :shortcut, :default

    notes = []
      notebook.notes.each do |note|
        notes.push(note.id)
      end
      
    json.notes notes
  end
end

@notebooks.each do |notebook|
  json.set! notebook.id do
    json.extract! notebook, :id, :user_id, :name, :shortcut, :default

    #TODO: pass the notes with the notebook from the controller using .includes
    #to avoid excessive database queries
    notes = []
      notebook.notes.each do |note|
        notes.push(note.id)
      end

    json.notes notes
  end
end

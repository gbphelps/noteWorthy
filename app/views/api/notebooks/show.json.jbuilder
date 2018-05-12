json.extract! @notebook, :id, :user_id, :name, :shortcut, :default

json.notes do
  @notebook.notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :body, :updated_at, :created_at
    end
  end
end

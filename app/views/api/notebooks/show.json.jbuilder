json.notebook do
  json.extract! @notebook, :id, :user_id, :name, :shortcut, :default
end

json.notes({})

json.notes do
  @notebook.notes.each do |note|
    json.set! note.id do
      json.extract! note, :id, :title, :body, :updated_at, :created_at
    end
  end
end

#TODO: Can use this view to grab all of the notes you need to display. SO instead of
#calling #index in notes controller, call #show for the notebook you're viewing

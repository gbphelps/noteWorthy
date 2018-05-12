@notebooks.each do |notebook|
  json.set! notebook.id do
    json.extract! notebook, :id, :user_id, :name, :shortcut, :default
  end
end

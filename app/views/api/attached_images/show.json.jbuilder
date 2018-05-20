json.extract! @attached_image, :note_id, :index_location
json.image_url do
  rails_blob_path(@attached_image.image, disposition: 'attachment')
end

class DropActiveStorageTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :active_storage_attachments
    drop_table :active_storage_blobs
    drop_table :attached_images
  end
end

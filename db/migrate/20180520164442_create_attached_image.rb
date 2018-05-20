class CreateAttachedImage < ActiveRecord::Migration[5.2]
  def change
    create_table :attached_images do |t|
      t.integer :note_id, null: false
      t.integer :index_location, null: false
      t.timestamps
    end
  end
end

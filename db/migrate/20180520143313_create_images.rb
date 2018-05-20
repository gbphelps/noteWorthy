class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.integer :note_id, null: false
      t.integer :index_location, null: false
    end
  end
end

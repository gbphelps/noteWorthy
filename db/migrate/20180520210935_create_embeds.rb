class CreateEmbeds < ActiveRecord::Migration[5.1]
  def change
    create_table :embeds do |t|
      t.integer :note_id, null: false
      t.integer :index_location, null: false
      t.timestamps
    end
  end
end

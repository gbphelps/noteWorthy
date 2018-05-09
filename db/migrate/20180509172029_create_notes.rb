class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :notebook_id
      t.string :title
      t.string :body
      t.boolean :shortcut
      t.timestamps
    end
  end
end

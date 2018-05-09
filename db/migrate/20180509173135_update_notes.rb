class UpdateNotes < ActiveRecord::Migration[5.1]
  def change
    change_column :notes, :title, :string, null: false
    change_column :notes, :body, :text
    add_index :notes, :notebook_id
  end
end

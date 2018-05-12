class CreateNotebooks < ActiveRecord::Migration[5.1]
  def change
    create_table :notebooks do |t|
      t.integer :user_id, null:false
      t.string :name, null: false
      t.boolean :shortcut, default: false
      t.boolean :default, default: false
    end
    add_index :notebooks, :user_id
    add_index :notebooks, [:user_id, :name], unique: true
  end
end

class RemoveImageConstraints < ActiveRecord::Migration[5.1]
  def change
    change_column :embeds, :note_id, :integer, null:true
    change_column :embeds, :index_location, :integer, null:true
  end
end

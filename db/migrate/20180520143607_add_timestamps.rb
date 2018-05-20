class AddTimestamps < ActiveRecord::Migration[5.1]
  def change
    add_column :images, :created_at, :datetime, null:false
    add_column :images, :updated_at, :datetime, null:false
  end
end

class DropImages < ActiveRecord::Migration[5.1]
  def up
    drop_table :images
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

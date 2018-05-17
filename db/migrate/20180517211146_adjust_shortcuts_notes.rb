class AdjustShortcutsNotes < ActiveRecord::Migration[5.1]
  def change
    change_column :notes, :shortcut, :boolean, default: false, null: false
  end
end

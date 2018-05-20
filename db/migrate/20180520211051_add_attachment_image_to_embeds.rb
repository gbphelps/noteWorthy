class AddAttachmentImageToEmbeds < ActiveRecord::Migration[5.1]
  def self.up
    change_table :embeds do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :embeds, :image
  end
end

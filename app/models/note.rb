class Note < ApplicationRecord
  belongs_to :notebook,
    foreign_key: :notebook_id,
    class_name: 'Notebook',
    optional: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :taggings,
    foreign_key: :note_id,
    class_name: 'Tagging'

  has_many :tags,
    through: :taggings,
    source: :tags

  has_many :embeds,
    foreign_key: :note_id,
    class_name: 'Embed'
end

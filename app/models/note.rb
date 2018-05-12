class Note < ApplicationRecord
  belongs_to :notebook,
    foreign_key: :notebook_id,
    class_name: 'Notebook',
    optional: true

  has_one :user,
    through: :notebook,
    source: :user

  has_many :taggings,
    foreign_key: :note_id,
    class_name: 'Tagging'

  has_many :tags,
    through: :taggings,
    source: :tags
end

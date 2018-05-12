class Tag < ApplicationRecord
  has_many :taggings,
    foreign_key: :tag_id,
    class_name: 'Taggings'

  has_many :notes,
    through: :taggings,
    source: :notes
end

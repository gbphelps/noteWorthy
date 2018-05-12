class Tagging < ApplicationRecord

  belongs_to :note,
    foreign_key: :note_id,
    class_name: 'Note'

  belongs_to :tag,
    foreign_key: :tag_id,
    class_name: 'Tag'

  has_one :user,
    through: :note,
    source: :user
end

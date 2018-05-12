class Notebook < ApplicationRecord
  has_many :notes,
    foreign_key: :notebook_id,
    class_name: 'Notes'

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User',
    optional: true

end

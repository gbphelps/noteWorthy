class Embed < ApplicationRecord
  has_attached_file :image, 'elephant.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end

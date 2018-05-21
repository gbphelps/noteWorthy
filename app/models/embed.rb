class Embed < ApplicationRecord
  has_attached_file :image, default_url: 'elephant.png'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end

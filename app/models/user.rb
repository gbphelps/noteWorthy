class User < ApplicationRecord
  validates :email, :username, :session_token, :password_digest, presence: true
  validates :email, :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 8, allow_nil: true}
  attr_reader :password
  after_initialize :ensure_token

  has_many :notebooks,
    foreign_key: :user_id,
    class_name: 'Notebook'

  has_many :notes,
    through: :notebooks,
    source: :notes




  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    check = BCrypt::Password.new(self.password_digest)
    check.is_password?(password)
  end

  def token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_token!
    self.session_token = token
    self.save!
    self.session_token
  end

  def ensure_token
    self.session_token ||= token
  end

  def self.find_by_credentials(identifier,password)
    user = User.find_by(email: identifier) || User.find_by(username: identifier)
    return user if user && user.is_password?(password)
  end
end

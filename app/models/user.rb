class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    validates :password, presence: true,length:{minimum:8}
    has_many :projects,dependent: :destroy
    has_many :posts, through: :projects

    has_one_attached :profile_picture

    validate :acceptable_profile_picture

  def acceptable_profile_picture
    return unless profile_picture.attached?

    unless profile_picture.byte_size <= 1.megabyte
      errors.add(:profile_picture, "is too big")
    end

    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(profile_picture.content_type)
      errors.add(:profile_picture, "must be a JPEG or PNG")
    end
  end

end

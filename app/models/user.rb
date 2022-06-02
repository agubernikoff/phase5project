class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true,uniqueness: true
    validates :password, presence: true,length:{minimum:8},on: :create
    has_many :projects,dependent: :destroy
    has_many :posts, through: :projects
    has_many :production_updates,through: :projects
    has_many :likes
    has_many :comments
    has_many :preorders

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

class Post < ApplicationRecord
  belongs_to :project
  has_many :likes
  has_many :users, through: :likes
  has_many :comments
  has_many :users, through: :comments
  
  has_one_attached :image

  validate :acceptable_image

  def acceptable_image
    return unless image.attached?

    unless image.byte_size <= 1.megabyte
      errors.add(:main_image, "is too big")
    end

    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(image.content_type)
      errors.add(:image, "must be a JPEG or PNG")
    end
  end

end

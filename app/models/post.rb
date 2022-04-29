class Post < ApplicationRecord
  belongs_to :project
  has_many :likes
  has_many :users, through: :likes
  has_many :comments
  has_many :users, through: :comments
  
  has_many_attached :media_types

  validate :acceptable_media_types

  def acceptable_media_types
    return unless media_types.attached?

    unless media_types.byte_size <= 1.megabyte
      errors.add(:media_types, "is too big")
    end

    acceptable_types = ["media_types/jpeg", "media_types/png","media_types/gif","media_types/MP4","media_types/MOV"]
    unless acceptable_types.include?(media_types.content_type)
      errors.add(:media_types, "must be a JPEG, PNG, GIF, MOV, or MP4 file")
    end
  end

end

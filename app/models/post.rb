class Post < ApplicationRecord
  belongs_to :project
  has_many :likes,dependent: :destroy
  has_many :users, through: :likes
  has_many :comments,dependent: :destroy
  has_many :users, through: :comments
  
  has_many_attached :media

  validate :acceptable_media

  def acceptable_media
    return unless media.attached?

    unless media.byte_size <= 1.megabyte
      errors.add(:media, "is too big")
    end

    acceptable = ["media/jpeg", "media/png","media/gif","media/MP4","media/MOV"]
    unless acceptable.include?(media.content_type)
      errors.add(:media, "must be a JPEG, PNG, GIF, MOV, or MP4 file")
    end

    unless media.length<=10
      errors.add(:media, "...too many attachments. Max is 10")
    end
  end

end

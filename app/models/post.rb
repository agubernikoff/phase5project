class Post < ApplicationRecord
  belongs_to :project
  has_many :likes,dependent: :destroy
  has_many :users, through: :likes
  has_many :comments,dependent: :destroy
  has_many :users, through: :comments
  
  has_many_attached :files

  # validate :acceptable_files

  def acceptable_files
    return unless files.attached?

    unless files.byte_size <= 1.megabyte
      errors.add(:files, "is too big")
    end

    acceptable = ["files/jpeg", "files/png","files/gif","files/MP4","files/MOV"]
    unless acceptable.include?(files.content_type)
      errors.add(:files, "must be a JPEG, PNG, GIF, MOV, or MP4 file")
    end

    unless files.length<=10
      errors.add(:files, "...too many attachments. Max is 10")
    end
  end

end

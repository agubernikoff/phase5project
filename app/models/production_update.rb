class ProductionUpdate < ApplicationRecord
    belongs_to :project
    has_many_attached :images

    validates :ETA, presence: true
    validates :status, presence: true
    validates :caption, presence: true
    validates :project_id, presence: true

    # validate :acceptable_images

  def acceptable_images
    return unless images.attached?

    unless images.byte_size <= 1.megabyte
      errors.add(:images, "is too big")
    end

    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(images.content_type)
      errors.add(:images, "must be a JPEG or PNG")
    end
  end
end

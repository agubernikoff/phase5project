class ProductionUpdateSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id,:caption,:status,:ETA,:created_at,:project_id,:images

  def images
    return unless object.images.attached?

    def image_url(image)
    rails_blob_path(image,only_path:true) 
    end

    object.images.map do |image|
      image.blob.attributes.slice(:imagename,:byte_size,:id).merge(url: image_url(image))
    end
    
  end
end

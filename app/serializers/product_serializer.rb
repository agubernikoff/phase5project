class ProductSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id,:name,:description,:price,:inventory,:xs,:s,:m,:l,:xl,:xxl,:one_size_fits_all,:project_id,:images

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

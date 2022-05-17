class ProductSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id,:name,:description,:price,:project_id,:main_image,:images,:seller_id,:seller,:seller_pic

  has_many :colors
  
  def images
    return unless object.images.attached?

    def image_url(image)
    rails_blob_path(image,only_path:true) 
    end

    object.images.map do |image|
      image.blob.attributes.slice(:imagename,:byte_size,:id).merge(url: image_url(image))
    end
    
  end

  def main_image
    rails_blob_path(object.main_image,only_path:true) if object.main_image.attached?
  end

  def seller_id
    User.find(Project.find(object.project_id).user_id).id
  end

  def seller
    User.find(Project.find(object.project_id).user_id).username
  end

  def seller_pic
    rails_blob_path(User.find(Project.find(object.project_id).user_id).profile_picture,only_path:true) if User.find(Project.find(object.project_id).user_id).profile_picture.attached?
  end
end

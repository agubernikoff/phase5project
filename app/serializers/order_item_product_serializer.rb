class OrderItemProductSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,:name,:description,:price,:main_image,:seller,:seller_pic

  def main_image
    rails_blob_path(object.main_image,only_path:true) if object.main_image.attached?
  end
  def seller
    User.find(Project.find(object.project_id).user_id).username
  end

  def seller_pic
    rails_blob_path(User.find(Project.find(object.project_id).user_id).profile_picture,only_path:true) if User.find(Project.find(object.project_id).user_id).profile_picture.attached?
  end
end

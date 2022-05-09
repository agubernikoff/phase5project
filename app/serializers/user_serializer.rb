class UserSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers

  attributes :id,:bio,:username,:isSeller,:profile_picture
  has_many :projects
  has_many :likes
  has_many :comments
  
  def profile_picture
    rails_blob_path(object.profile_picture,only_path:true) if object.profile_picture.attached?
  end
end

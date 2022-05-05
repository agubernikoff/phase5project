class UserSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers

  attributes :id,:username,:isSeller,:profile_picture,:projects,:likes
  
  def projects
    ActiveModelSerializers::SerializableResource.new(object.projects,each_serializer: ProjectSerializer)
  end

  def likes
    ActiveModelSerializers::SerializableResource.new(object.likes,each_serializer: LikeSerializer)
  end
  
  def profile_picture
    rails_blob_path(object.profile_picture,only_path:true) if object.profile_picture.attached?
  end
end

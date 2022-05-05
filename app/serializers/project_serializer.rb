class ProjectSerializer < ActiveModel::Serializer
  attributes :id,:title,:description,:likes_threshold,:status,:created_at,:posts
  
  def posts
    ActiveModelSerializers::SerializableResource.new(object.posts,each_serializer: PostSerializer)
  end
end

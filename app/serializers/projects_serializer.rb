class ProjectsSerializer < ActiveModel::Serializer
  attributes :id,:title,:description,:likes_threshold,:status,:created_at,:posts
  
  def posts
    ActiveModel::SerializableResource.new(object.posts,each_serializer: PostsSerializer)
  end
end

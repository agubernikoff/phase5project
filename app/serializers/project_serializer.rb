class ProjectSerializer < ActiveModel::Serializer
  attributes :id,:title,:description,:likes_threshold,:status,:created_at,:posts,:production_updates
  
  def posts
    ActiveModelSerializers::SerializableResource.new(object.posts,each_serializer: PostSerializer)
  end

  def production_updates
    ActiveModelSerializers::SerializableResource.new(object.production_updates,each_serializer: ProductionUpdateSerializer)
  end
end

class ProjectSerializer < ActiveModel::Serializer
  attributes :id,:title,:description,:likes_threshold,:status,:created_at,:user_id,:posts,:production_updates,:preorders,:products
  
  
  def posts
    ActiveModelSerializers::SerializableResource.new(object.posts,each_serializer: PostSerializer)
  end

  def production_updates
    ActiveModelSerializers::SerializableResource.new(object.production_updates,each_serializer: ProductionUpdateSerializer)
  end

  def preorders
    ActiveModelSerializers::SerializableResource.new(object.preorders,each_serializer: PreorderSerializer)
  end

  def products
    ActiveModelSerializers::SerializableResource.new(object.products,each_serializer: ProductSerializer)
  end
end

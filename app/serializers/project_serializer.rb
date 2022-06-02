class ProjectSerializer < ActiveModel::Serializer
  attributes :id,:title,:description,:likes_threshold,:status,:created_at,:user_id,:posts,:production_updates,:products
  has_many :preorders
  
  def posts
    ActiveModelSerializers::SerializableResource.new(object.posts,each_serializer: PostSerializer)
  end

  def production_updates
    ActiveModelSerializers::SerializableResource.new(object.production_updates,each_serializer: ProductionUpdateSerializer)
  end

  def products
    ActiveModelSerializers::SerializableResource.new(object.products,each_serializer: ProductSerializer)
  end
end

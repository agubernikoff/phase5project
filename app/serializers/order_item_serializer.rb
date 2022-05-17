class OrderItemSerializer < ActiveModel::Serializer
  attributes :id,:quantity,:price,:order_id,:size,:color,:product

  def product
      ActiveModelSerializers::SerializableResource.new(Product.find(object.product_id),serializer: OrderItemProductSerializer)
  end
end

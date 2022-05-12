class OrderSerializer < ActiveModel::Serializer
  attributes :id,:subtotal,:items

  def items
    ActiveModelSerializers::SerializableResource.new(object.order_items,each_serializer: OrderItemSerializer)
  end
end

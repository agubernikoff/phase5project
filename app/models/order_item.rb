class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  before_destroy :update_inventory

  private

  def update_inventory
    product = Product.find(self.product_id)
    color = product.colors.find_by(color:self.color)
    color[self.size]+=self.quantity
    color.save
  end
end

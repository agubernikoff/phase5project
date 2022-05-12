class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items, dependent: :destroy
  has_many :products,through: :order_items

  validates :user_id, presence: true

  before_save :calculate_subtotal

  def calculate_subtotal
    if self.order_items
    self[:subtotal] = self.order_items.map{|item| item.price}.sum.to_f
    elsif self[:subtotal]=0
    end
  end
end

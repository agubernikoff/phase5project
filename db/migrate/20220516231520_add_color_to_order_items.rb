class AddColorToOrderItems < ActiveRecord::Migration[6.1]
  def change
    add_column :order_items, :color, :string
  end
end

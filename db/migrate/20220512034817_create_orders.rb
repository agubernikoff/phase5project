class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :subtotal
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

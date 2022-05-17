class CreateColors< ActiveRecord::Migration[6.1]
  def change
    create_table :colors do |t|
      t.string :color
      t.integer :inventory
      t.integer :xs
      t.integer :s
      t.integer :m
      t.integer :l
      t.integer :xl
      t.integer :xxl
      t.integer :one_size_fits_all

      t.belongs_to :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end

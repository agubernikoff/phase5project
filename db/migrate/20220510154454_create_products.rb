class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.float :price
      
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end

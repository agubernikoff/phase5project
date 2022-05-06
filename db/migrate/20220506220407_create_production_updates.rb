class CreateProductionUpdates < ActiveRecord::Migration[6.1]
  def change
    create_table :production_updates do |t|
      t.string :ETA
      t.string :status
      t.string :caption
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end

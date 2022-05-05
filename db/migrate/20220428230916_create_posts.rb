class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :caption
      t.string :username
      t.string :user_profile_picture
      t.belongs_to :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end

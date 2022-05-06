class AddProfilepictureToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :commenter_profile_picture, :string
  end
end

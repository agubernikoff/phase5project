class AddUsernameToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :commenter_username, :string
  end
end

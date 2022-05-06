class CommentSerializer < ActiveModel::Serializer
  attributes :id,:comment,:post_id,:user_id,:commenter_username,:commenter_profile_picture
end

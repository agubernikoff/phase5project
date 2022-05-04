class PostsSerializer < ActiveModel::Serializer
  attributes :id,:caption,:project_id,:created_at
  has_many :likes
  has_many :comments
end

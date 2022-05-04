class PostSerializer < ActiveModel::Serializer
  attributes :id,:username,:caption,:project_id,:created_at
  has_many :likes
  has_many :comments
end

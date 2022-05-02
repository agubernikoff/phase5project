class Project < ApplicationRecord
    belongs_to :user
    has_many :posts, dependent: :destroy
    has_many :likes, through: :posts
    has_many :comments, through: :posts
end

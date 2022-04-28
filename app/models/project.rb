class Project < ApplicationRecord
    belongs_to :user
    has_many :posts
    has_many :likes, through: :posts
    has_many :comments, through: :posts
end

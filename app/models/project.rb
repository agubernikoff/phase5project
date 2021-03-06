class Project < ApplicationRecord
    belongs_to :user
    has_many :posts, dependent: :destroy
    has_many :likes, through: :posts
    has_many :comments, through: :posts
    has_many :production_updates,dependent: :destroy
    has_many :preorders,dependent: :destroy
    has_many :products,dependent: :destroy
    validates :title, presence: true
    validates :likes_threshold, presence: true
    validates :status, presence: true
    validates :user_id, presence: true

    def calculate_avg_likes
        if self.posts.length>0
        self.posts.map{|post| post.likes.length}.sum.to_f/self.posts.length.to_f
        else 0
        end
    end
end

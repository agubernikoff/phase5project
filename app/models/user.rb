class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true
    validates :password, presence: true,length:{minimum:8}
    has_many :projects
    has_many :posts, through: :projects
end

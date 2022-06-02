class Preorder < ApplicationRecord
    belongs_to :project
    belongs_to :user

    validates :user_id, uniqueness: true
end

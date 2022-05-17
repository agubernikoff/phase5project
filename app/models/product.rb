class Product < ApplicationRecord
    belongs_to :project
    has_many :order_items, dependent: :destroy
    has_many :orders, through: :order_items, dependent: :destroy
    has_many :colors, dependent: :destroy

    has_one_attached :main_image
    has_many_attached :images

    validates :name, presence: true
    validates :price, presence: true
    validates :images, presence: true,on: :create
    validates :main_image, presence: true,on: :create

end

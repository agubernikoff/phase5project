class Product < ApplicationRecord
    belongs_to :project

    has_many_attached :images

    before_save :calculate_inventory

    validates :name, presence: true
    validates :price, presence: true
    validates :images, presence: true,on: :create

    def calculate_inventory
    self[:inventory] =xs+s+m+l+xl+xxl+one_size_fits_all
    end
end

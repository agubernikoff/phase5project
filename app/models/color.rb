class Color < ApplicationRecord
    belongs_to :product

    before_save :calculate_inventory

    def calculate_inventory
        self[:inventory] =xs+s+m+l+xl+xxl+one_size_fits_all
    end
end

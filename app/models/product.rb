class Product < ApplicationRecord
    belongs_to :project

    has_many_attached :images

    before_save :calculate_inventory

    def calculate_inventory
    self[:inventory] =xs+s+m+l+xl+xxl+one_size_fits_all
    end

    def sell_one size_column
        binding.pry
    end
end

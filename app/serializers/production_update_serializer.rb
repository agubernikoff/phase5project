class ProductionUpdateSerializer < ActiveModel::Serializer
  attributes :id,:caption,:status,:ETA,:created_at
end
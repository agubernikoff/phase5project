class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id,:user_id,:username,:user_profile_picture,:caption,:project_id,:created_at,:files
  has_many :likes
  has_many :comments

  def files
    return unless object.files.attached?

    def file_url(file)
    rails_blob_path(file,only_path:true) 
    end

    object.files.map do |file|
      file.blob.attributes.slice(:filename,:byte_size,:id).merge(url: file_url(file))
    end
    
  end
end

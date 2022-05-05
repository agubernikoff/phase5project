class PostsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
    
    def index
        render json: Post.all
    end

    def show
        post = Post.find(params[:post_id])
        render json: post
    end

    def create
        # byebug
        post= Post.create!(post_params)
        render json: post, status: :created
    end

    def update
        post = Post.find(params[:post_id])
        post.update!(post_params)
        render json: post, status: :updated
    end

    def destroy
        post = Post.find(params[:post_id])
        post.destroy
        head :no_content
    end

    private
    
    def post_params
      params.permit(:project_id,:username,:caption,files:[])
    end
    
    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "User not found"}, status: 404
    end
end

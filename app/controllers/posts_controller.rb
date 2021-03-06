class PostsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
    skip_before_action :is_logged_in?, only: :index
    
    def index
      # session.delete :number
      session[:number] ||=25
      new_project_posts=Post.joins(:project).where(project: {status:'New Project'}).order(id: :desc)
      render json: new_project_posts.first(session[:number])
      
      if session[:number] +25 > new_project_posts.length
        session[:number]=new_project_posts.length
      elsif session[:number] < new_project_posts.length
        session[:number]+=25
      end
    end

    def show
        post = Post.find(params[:id])
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

    def delete
        post = Post.find(params[:post_id])
        post.destroy
        head :no_content
    end

    private
    
    def post_params
      params.permit(:project_id,:user_id,:username,:user_profile_picture,:caption,files:[])
    end
    
    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "Post not found"}, status: 404
    end
end

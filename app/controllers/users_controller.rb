class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
    
    
    def index
      users = User.all
      render json: users
    end
    
    def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end
    
    def show_me
      user = User.find(session[:user_id])
      if user
        render json: user
      else
        render json: {error: "Not authorized"}, status: :unauthorized
      end
    end
    
    def update
      user = User.find(session[:user_id])
      user.update!(user_params)
      render json: user
    end
    
    def destroy
      user = User.find(session[:user_id])
      user.destroy
      session.delete :user_id
      head :no_content
    end
    
    private
    
    def user_params
      params.permit(:username, :password,:isSeller,:profile_picture)
    end
    
    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "User not found"}, status: 404
    end
  end

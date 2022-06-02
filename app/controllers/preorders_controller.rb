class PreordersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  before_action :set_preorder, only: [:show, :update, :destroy]
  before_action :priority_likes, only: [:create]

  # GET /preorders
  def index
    @preorders = Preorder.all
    render json: @preorders
  end

  # GET /preorders/1
  # def show
  #   render json: @preorder
  # end

  # POST /preorders
  def create
    @preorder = Preorder.create!(preorder_params)
    render json: @preorder, status: :created, location: @preorder
  end

  # PATCH/PUT /preorders/1
  # def update
  #   if @preorder.update(preorder_params)
  #     render json: @preorder
  #   else
  #     render json: @preorder.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /preorders/1
  def destroy
    @preorder.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_preorder
      @preorder = Preorder.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def preorder_params
      params.permit(:project_id,:user_id)
    end

    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "Preorder not found"}, status: 404
    end

    def priority_likes
      project=Project.find(params[:project_id])
      if project.preorders.length == project.likes_threshold
        render json:{error:'SOLD OUT'},status: :unauthorized
      end

      nested = project.posts.map{|p| p.likes.filter{|l|l.created_at<project.updated_at}.map{|l|l.user_id}}
      all_users_who_like = []
      nested.each{|array|array.each{|user_id| all_users_who_like<<user_id }}
      
      unless Time.current > project.updated_at + 1.day || all_users_who_like.include?(params[:user_id])
        render json:{error:'unauthorized'},status: :unauthorized
      end
    end
end

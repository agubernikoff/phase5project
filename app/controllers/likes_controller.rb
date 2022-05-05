class LikesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  before_action :set_like, only: [:show, :update, :destroy]

  # GET /likes
  def index
    @likes = Like.all
    render json: @likes
  end

  # GET /likes/1
  # def show
  #   render json: @like
  # end

  # POST /likes
  def create
    @like = Like.create!(like_params)
    render json: @like, status: :created, location: @like
  end

  # PATCH/PUT /likes/1
  # def update
  #   @like.update!(like_params)
  #     render json: @like
  # end

  # DELETE /likes/1
  def destroy
    @like.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_like
      @like = Like.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def like_params
      params.permit(:post_id,:user_id)
    end

    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "User not found"}, status: 404
    end
end

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
    post=Post.find(params[:post_id])
    project=post.project
    avg_likes=project.posts.map{|post| post.likes.length}.sum.to_f/project.posts.length.to_f
    if avg_likes == project.likes_threshold
      project.update(status: 'Preorder')
      render json: {like: @like,updated_project: project,updated_project_posts:project.posts,message: ["PROJECT REACHED LIKES THRESHOLD.","NOW AVAILABLE FOR PREORDER.","MOVED TO 'COMING SOON' TAB"]}
    else render json: @like, status: :created, location: @like
    end
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

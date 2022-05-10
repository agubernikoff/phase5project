class ProjectsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
    
    def index
        render json: Project.all.where(status:'Preorder')
    end

    def liked_projects
      projects=User.find(params[:id]).likes.map{|l|l.post_id}.map{|id| Post.find(id)}.map{|p|p.project_id}.map{|id| Project.find(id)}
      render json: projects.uniq
    end

    def show
        project = Project.find(params[:id])
        render json: project
    end

    def create
        project= Project.create!(project_params)
        render json: project, status: :created
    end

    def update
        project = Project.find(params[:project_id])
        project.update!(project_params)
        render json: project, status: :updated
    end

    def destroy
        project = Project.find(params[:project_id])
        project.destroy
        head :no_content
    end

    private
    
    def project_params
      params.permit(:title, :description,:likes_threshold,:status,:user_id)
    end
    
    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "User not found"}, status: 404
    end
end

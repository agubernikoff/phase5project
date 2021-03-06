class ProductionUpdatesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found

  def create
    production_update= ProductionUpdate.create!(production_update_params)
    if params[:status] == 'Completed'
      project=Project.find(params[:project_id])
      project.update(status:'For Sale')
    end
    render json: production_update, status: :created
  end

  def destroy
    production_update= ProductionUpdate.find(params[:id])
    production_update.destroy
  end

  private 

  def production_update_params
    params.permit(:ETA,:status,:caption,:project_id,images: [])
  end

  def render_unprocessable_entity invalid
    render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
  end
  
  def render_not_found
    render json: {error: "Update not found"}, status: 404
  end
end

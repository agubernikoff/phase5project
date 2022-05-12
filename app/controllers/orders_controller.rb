class OrdersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    @orders = Order.all

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.create!(order_params)
    session[:current_order_id] = @order.id
      render json: @order, status: :created, location: @order
  end

  # PATCH/PUT /orders/1
  def update
    @order.update!(order_params)
      render json: @order
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.permit(:subtotal,:user_id)
    end

    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "User not found"}, status: 404
    end
end

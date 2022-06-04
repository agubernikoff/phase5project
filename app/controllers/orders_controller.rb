class OrdersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  before_action :set_order, only: [:show, :update, :destroy]
  before_action :priority_preorder, only: [:create]

  # GET /orders
  def index
    @orders = Order.all

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  def current_order
    current_order=Order.find(session[:current_order_id])
    render json: current_order
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

    def priority_preorder
      product = Product.find(params[:product_id])
      project=product.project
      users_who_preordered=project.preorders.map{|pre| pre.user_id}
      unless users_who_preordered.include?(params[:user_id]) || Time.current > project.updated_at + 1.day
        render json:{error:["UNAUTHORIZED:"," THIS ACTION IS CURRENTLY RESERVED FOR USERS WHO PREORDERED THE PRODUCT. ", "PLEASE TRY AGAIN ON ","#{project.updated_at + 1.day}"]},status: :unauthorized
      end
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.permit(:subtotal,:user_id)
    end

    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "Order not found"}, status: 404
    end
end

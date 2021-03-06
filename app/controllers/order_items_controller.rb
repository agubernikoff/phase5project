class OrderItemsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  before_action :set_order_item, only: [:show, :update, :destroy]

  # GET /order_items
  def index
    @order_items = OrderItem.all

    render json: @order_items
  end

  # GET /order_items/1
  def show
    render json: @order_item
  end

  # POST /order_items
  def create
    product=Product.find(params[:product_id])
    color=product.colors.find_by(color: params[:color])
    order=Order.find(params[:order_id])
    if color[params[:size].to_sym] >= params[:quantity]
      @order_item = OrderItem.create!(order_item_params)
      order.update(id: params[:order_id])
      color[params[:size].to_sym]-= params[:quantity]
      color.save
      render json: @order_item, status: :created, location: @order_item
    else 
      render json:{error: "Invalid quantity. Only #{color[params[:size].to_sym]} #{params[:size].upcase} left."}, status: :unauthorized
    end
  end

  # PATCH/PUT /order_items/1
  def update
    @order_item.update!(order_item_params)
      render json: @order_item
  end

  # DELETE /order_items/1
  def destroy
    @order_item.destroy
    render json: @order_item
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order_item
      @order_item = OrderItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_item_params
      params.permit(:quantity,:color,:size,:price,:order_id,:product_id)
    end

    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "Item not found"}, status: 404
    end
end

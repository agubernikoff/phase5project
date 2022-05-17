class ProductsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid,with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound,with: :render_not_found
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /products
  def index
    @products = Product.all

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.create!(product_params)
    colors= params[:colors].split(',').each {|c| Color.create(product_id: @product.id,color: c,xs: params[:xs],s: params[:s], m: params[:m],l: params[:l],xl: params[:xl],xxl: params[:xxl],one_size_fits_all: params[:one_size_fits_all])}
    render json: @product, status: :created, location: @product
  end

  # PATCH/PUT /products/1
  def update
    @product.update(product_params)
    render json: @product
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.permit(:id,:name,:description,:price,:project_id,:main_image,images:[])
    end

    def render_unprocessable_entity invalid
      render json: {errors: invalid.record.errors.full_messages},status: :unprocessable_entity
    end
    
    def render_not_found
      render json: {error: "Product not found"}, status: 404
    end
end

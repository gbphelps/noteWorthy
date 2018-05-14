class Api::TaggingsController < ApplicationController


  def create
    @tagging = Tagging.new(tagging_params)
    if @tagging.save
      render :show
    else
      render json: @tagging.errors.full_messages
    end
  end

  def index
    @taggings = Tagging.all
  end

  def update
    @tagging = Tagging.find(params[:id])
    if @tagging.update(tagging_params)
      render :show
    else
      render json: @tagging.errors.full_messages
    end
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    @tagging.destroy
  end

  def show
    @tagging = Tagging.find(params[:id])
  end

  private

  def tagging_params
    params.require(:tagging).permit(:tag_id, :note_id)
  end

end

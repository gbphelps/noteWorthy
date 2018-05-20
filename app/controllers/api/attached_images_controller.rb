class Api::AttachedImagesController < ApplicationController

  def create
    @attached_image = AttachedImage.new(image_params)
    @attached_image.image.attach(io: File.open(image_url(elephant.png)), filename: 'elephant.png')
    if @attached_image.save
      render :show
    else
      render json: ['oops'], status: 422
    end
  end

  private

  def image_params
    params.require(:image).permit(:index_location, :note_id)
  end
end

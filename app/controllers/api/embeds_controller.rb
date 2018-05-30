class Api::EmbedsController < ApplicationController
  def index
    @embeds = Embed.all
  end

  def create
    @embed = Embed.new(embed_params)
    @embed.save
    render :show
  end

  def show
    @embed = Embed.find(params[:id])
  end


private

  def embed_params
    params.require(:embed).permit(:note_id, :index_location, :image)
  end
end

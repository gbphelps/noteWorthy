class Api::NotesController < ApplicationController

  def index
    @notes = Note.all
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render :show
    else
      render json: ['An unexpected error occured. Please try again'], status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
  end

  def update
    @note = Note.find(params[:id])
    if @note.update(note_params)
      render :show
    else
      render json: ['An unexpected error occured. Please try again'], status: 422
    end
  end

  def show
    @note = Note.find(params[:id])
  end

  private

  def note_params
    params.require(:note).permit(:notebook_id,:title,:body,:id)
  end
end

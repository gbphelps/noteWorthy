class Api::NotesController < ApplicationController
  def create
    @note = Note.new(note_params)
    if @note.save
      render :show
    else
      render json: ['An unexpected error occured. Please try again'], status: 422
    end
  end

  def delete
  end

  def update
  end

  private

  def note_params
    params.require(:note).permit(:notebook_id,:title,:body)
  end
end

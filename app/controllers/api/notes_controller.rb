class Api::NotesController < ApplicationController

  def index
    @notes = current_user.notes
  end

  def shortcuts
    @notes = current_user.notes.where(shortcut: true)
    render :index
  end


  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
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
      render json: @note.errors.full_messages, status: 422
    end
  end

  def show
    @note = Note.find(params[:id])
    render :show
  end

  private

  def note_params
    params.require(:note).permit(:notebook_id,:title,:body, :id, :shortcut)
  end
end

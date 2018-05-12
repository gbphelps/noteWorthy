class Api::NotebooksController < ApplicationController

  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render :show
    else
      render json: @notebook.errors.full_messages
    end
  end

  def show
    @notebook = Notebook.find(params[:id])
  end

  def update
    @notebook = Notebook.find(params[:id])
    if @notebook.update(notebook_params)
      render :show
    else
      render json: @notebook.errors.full_messages
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
  end

  private

  def notebook_params
    params.require(:notebook).permit(:user_id, :name)
  end

end

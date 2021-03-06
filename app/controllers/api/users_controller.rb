class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def destroy
  end

  def lookup
    identifier = params[:identifier]
    @user = User.find_by(email: identifier) || User.find_by(username: identifier)
    if @user
      render :show
    else
      render json: ['Incorrect username or email'], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end

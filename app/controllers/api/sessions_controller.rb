class Api::SessionsController < ApplicationController


  def create
    @user = User.find_by_credentials(params[:user][:identifier], params[:user][:password])
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ['Invalid login']
    end
  end

  def destroy
    logout
  end
end

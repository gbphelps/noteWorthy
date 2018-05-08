class Api::SessionsController < ApplicationController


  def create
    @user = User.find_by_credentials(params[:user][:identity], params[:user][:password])
    if @user
      login(@user)
    else
      render json: ['Invalid login']
    end
  end

  def destroy
  end
end

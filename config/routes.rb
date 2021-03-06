Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do

    resources :users, only: [:create, :destroy, :show] do
      collection do
        get 'lookup'
      end
    end

    resource :session, only: [:create, :destroy]

    resources :embeds, only: [:show, :index, :create, :update]

    resources :notes, only: [:index, :create, :update, :destroy, :show] do
      collection do
        get 'shortcuts'
      end
    end

    resources :notebooks, only: [:index, :create, :update, :destroy, :show]
    resources :tags, only: [:index, :create, :update, :destroy, :show]
    resources :taggings, only: [:index, :create, :destroy, :update, :show]

  end

end

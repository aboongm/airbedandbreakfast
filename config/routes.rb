Rails.application.routes.draw do
  root "home#index"
  devise_for :users

  namespace :api do
    get '/users_by_email' => "users_by_emails#show", as: :users_by_email

    resources :favorites, only: [:create, :destroy]
  end
end

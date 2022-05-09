Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  post "/login", to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: 'users#show_me'
  post "/signup", to: 'users#create'
  get '/users', to: 'users#index'
  patch '/me', to: 'users#update'
  delete '/users', to: 'users#destroy'
  resources :projects
  resources :posts
  resources :likes, only:[:index, :create, :destroy]
  resources :comments, only: [:index, :create, :destroy]
  post '/production_updates',to: 'production_updates#create'
  delete '/production_updates',to: 'production_updates#destroy'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

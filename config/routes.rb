require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  
  get 'users/index'
  root to: "users#index"

  get "/export_user" => "users#export"
  get "/export_status" => "users#export_status"
  get "/export_download" => "users#export_download"
end

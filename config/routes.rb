Rails.application.routes.draw do
  get  '/home',    to: 'static_pages#home'

  get  '/map',    to: 'static_pages#map'
  post  '/map',    to: 'static_pages#map'

  get  '/help',    to: 'static_pages#help'

  get  '/about',    to: 'static_pages#about'

  get  '/data',    to: 'static_pages#data'
  post  '/data',    to: 'static_pages#data'

  get 'test_pages/home'
  
  post 'static_pages/update'

  root 'static_pages#home'
end
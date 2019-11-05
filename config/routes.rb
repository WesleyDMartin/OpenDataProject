Rails.application.routes.draw do
  get 'static_pages/home'

  get 'static_pages/map'

  get 'static_pages/help'

  get 'static_pages/about'

  get 'static_pages/data'

  get 'test_pages/home'
  
  post 'static_pages/update'

  root 'static_pages#home'
end
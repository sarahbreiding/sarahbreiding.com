require 'sinatra'

get '/' do
  @title = 'Sarah Breiding | Digital Library &amp; Information Professional'
  @slug = 'home'
  erb :index
end

get '/about/?' do
  @title = 'About | Sarah Breiding'
  @slug = 'about'
  erb :about
end

get '/portfolio/?' do
  @title = 'Portfolio | Sarah Breiding'
  @slug = 'portfolio'
  erb :portfolio
end

get '/contact/?' do
  @title = 'Contact | Sarah Breiding'
  @slug = 'contact'
  erb :contact
end
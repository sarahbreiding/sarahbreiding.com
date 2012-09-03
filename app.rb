require 'sinatra'

get '/' do
  @title = 'Sarah Breiding | Digital Library &amp; Information Professional'
  erb :index
end

get '/about/?' do
  @title = 'About | Sarah Breiding'
  erb :about
end

get '/portfolio/?' do
  @title = 'Portfolio | Sarah Breiding'
  erb :portfolio
end

get '/contact/?' do
  @title = 'Contact | Sarah Breiding'
  erb :contact
end
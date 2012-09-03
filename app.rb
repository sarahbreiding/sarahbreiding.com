require 'sinatra'
require 'pony'
require 'maruku'
require_relative '../secrets.rb'

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

post '/send-message' do
  Pony.mail({
    to: 'breiding.sarah@gmail.com',
    subject: "Website Contact Form Submission from #{params[:name]}",
    html_body: erb(:email, layout: false),

    via: :smtp,
    via_options: {
      address: 'smtp.gmail.com',
      port: '587',
      enable_starttls_auto: true,
      user_name: 'breiding.sarah@gmail.com',
      password: GAPPS_PW,
      authentication: :plain,
      domain: 'sarahbreiding.com'
    }
  })

  '<div class="response valid">Your message has been sent - Thank you!</div>'
end
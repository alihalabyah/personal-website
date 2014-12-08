# config valid only for current version of Capistrano
# lock '3.3.3'

set :application, 'nerf-warfare'

set :scm, :git
set :repo_url, 'git@github.com:ConnorAtherton/personal-website.git'
set :branch, :master

set :user, 'Connor'
set :use_sudo, true
set :port, 22

set :deploy_to, '/var/www/test'
set :deploy_via, :rsync_with_remote_cache
set :format, :pretty
set :log_level, :debug
set :keep_releases, 3

namespace :deploy do

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  after :setup, :install_deps
  after :setup, :start_server

  task :install_deps do
    run "npm install"
  end

  task :start_server do
    run "forever start --spinSleepTime 1000 server.js"
    run "sudo service nginx restart"
  end
end

# config valid only for current version of Capistrano
lock '3.3.3'

set :application, 'test.connoratherton.com'

set :scm, :git
set :repo_url, 'git@github.com:ConnorAtherton/personal-website.git'
set :branch, :master

set :user, 'Connor'
set :use_sudo, true
set :port, 22

set :deploy_to, "/var/www/#{fetch(:application)}"
set :deploy_via, :rsync_with_remote_cache
set :format, :pretty
set :log_level, :debug
set :keep_releases, 3

namespace :deploy do
  before :deploy,   "deploy:check_revision"
  after  :deploy,   "deploy:install_deps"
  after  :deploy,   "setup:symlink_config"
  after  :deploy,   "deploy:restart"
  after  :rollback, "deploy:restart"
end


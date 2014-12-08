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

Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }

namespace :deploy do

  desc "Makes sure local git is in sync with remote."
  task :check_revision do
    unless `git rev-parse HEAD` == `git rev-parse origin/master`
      puts "WARNING: HEAD is not the same as origin/master"
      puts "Run `git push` to sync changes."
      exit
    end
  end

  desc "Installs all dependencies"
  task :install_deps do
    run "npm install && npm update"
  end

  %w[start stop restart].each do |command|
    desc "#{command} nginx."
    task command do
      on roles(:app) do
        execute "#{try_sudo} service nginx #{command}"
      end
    end
  end

  before :deploy,   "deploy:check_revision"
  before :deploy,   "setup:symlink_config"
  after  :deploy,   "deploy:install_deps"
  after  :deploy,   "deploy:restart"
  after  :rollback, "deploy:restart"
end

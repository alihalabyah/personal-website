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
    on roles(:app) do
      execute "cd #{current_path} && npm install"
    end
  end

  %w(start stop restart).each do |command|
    desc "#{command} nginx."
    # TODO: Create separate tasks for nginx and forever processes
    task command do
      on roles(:app) do
        execute "sudo service nginx #{command}"
        unless command == "stop"
          # kill all forever processes
          # execute "ps aux | grep forever | awk '{print $2}' | xargs kill -9"
          # forver start to run a daemon, append the logs
          execute "cd #{current_path} && forever start -a server.js --prod"
        end
      end
    end
  end
end

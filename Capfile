# Load DSL and set up stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'

# Troubleshoot connection problems
require 'capistrano/ssh_doctor'

# Load all tasks
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }

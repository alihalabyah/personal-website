role :app, "Connor@connoratherton.com"
role :web, "Connor@connoratherton.com"

# Global options
# --------------
set :ssh_options, {
  user: "Connor",
  keys: %w{"~/.ssh/google_compute_engine"},
  forward_agent: true
}

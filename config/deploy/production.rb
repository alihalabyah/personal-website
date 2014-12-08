role :app, "connoratherton.com"
role :web, "connoratherton.com"

# Global options
# --------------
set :ssh_options, {
  user: "Connor",
  keys: %w{"~/.ssh/google_compute_engine" "~/.ssh/id_rsa"},
  forward_agent: true
}

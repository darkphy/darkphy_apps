# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :darkphy_web,
  namespace: DarkphyWeb,
  ecto_repos: [DarkphyWeb.Repo]

# Configures the endpoint
config :darkphy_web, DarkphyWeb.Endpoint,
  url: [host: "darkphy.dev"],
  secret_key_base: "DVYhQ/3ZOnYHClvslsc7buN3IzoibwiqOxYeP+bv1Sq+IMV5062B6ivTTAwrzevS",
  render_errors: [view: DarkphyWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: DarkphyWeb.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :darkphy_web, :generators,
  context_app: false

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

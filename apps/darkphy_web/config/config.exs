# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :darkphy_web,
  namespace: DarkphyWeb

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


#Guardian configs
config :guardian, Guardian,
  allowed_algos: ["ES512"],
  issuer: "DarkphyWeb",
  ttl: {60, :seconds},
  verify_issuer: true,
  secret_key: %{"alg" => "ES512", "crv" => "P-521",
  "d" => "AUBbUuKduVYRS9sXoUSnglD8jB0xu4flVXm_JkoWkgRuRBLaP3MASRMlc6kJJc6pqae8VgEWBWU0nmel23GVG2nG",
  "kty" => "EC", "use" => "sig",
  "x" => "AIb1uo0w3XgAIlC5R1omBtdxKgJ8nIDRzOJO98wvwds8tYuOkhPzB9hVMy45m_WiCmZlPLx2sQ77r7RhrkHIJy6f",
  "y" => "AJ-nXiNudDKQFPAlfjXObgAs57am3P7i8qPKGtPYoUUIGP2NVAhbLcoluw0UBps72vi2OoO4v3ExyJY2EDWPwDN_"},
  #secret_key: System.get_env("GUARDIAN_SECRET_KEY")
  serializer: DarkphyWeb.GuardianSerializer


import_config "#{Mix.env}.exs"

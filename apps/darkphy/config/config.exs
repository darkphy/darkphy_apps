# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config



# Configure your database
config :darkphy, Darkphy.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "mother",
  password: "fucker",
  database: "darkphy",
  hostname: "localhost",
  pool_size: 10


config :darkphy,
  ecto_repos: [Darkphy.Repo]


#     import_config "#{Mix.env}.exs"

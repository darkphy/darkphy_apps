# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config


hostname = "localhost"
if Mix.env === "test" do
  hostname="mysql"
end

# Configure your database
config :darkphy, Darkphy.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "mother",
  password: "fucker",
  database: "darkphy",
  hostname: hostname,
  pool_size: 10


config :darkphy,
  ecto_repos: [Darkphy.Repo]


#     import_config "#{Mix.env}.exs"

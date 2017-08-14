# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

hostname =
case Mix.env === "" do
  "test" -> "mysql"
  _ -> "localhost"
end


config :auth, Auth.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "mother",
  password: "fucker",
  database: "darkphy",
  hostname: hostname,
  pool_size: 10

config :auth,
  ecto_repos: [Auth.Repo]


#import_config "#{Mix.env}.exs"

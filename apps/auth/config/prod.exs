use Mix.Config

# Do not print debug messages in production
config :logger, level: :info

# Configure your database
config :auth, Auth.Repo,
  adapter: Ecto.Adapters.MySQL,
  hostname: "${DB_HOSTNAME}",
  username: "${DB_USERNAME}",
  password: "${DB_PASSWORD}",
  database: "${DB_NAME}",
  pool_size: 20

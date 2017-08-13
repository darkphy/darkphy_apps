defmodule DarkphyWeb.RedisConfigs do
  def get_conn() do
    {:ok, redis_conn} = Redix.start_link(host: "127.0.0.1", port: 6379)
    redis_conn
  end
  def stop_conn(redis_conn) do
    Redix.stop(redis_conn)
  end
  def set_refresh_token(redis_conn,refresh_token,id) do
    Redix.command(redis_conn, ["SET", refresh_token <> "_refresh_token" , id ])
  end
  def get_refresh_token(redis_conn,refresh_token) do
    Redix.command(redis_conn, ["GET", refresh_token <> "_refresh_token"])
  end
end

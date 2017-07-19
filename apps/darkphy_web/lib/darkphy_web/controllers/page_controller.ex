defmodule DarkphyWeb.PageController do
  use DarkphyWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

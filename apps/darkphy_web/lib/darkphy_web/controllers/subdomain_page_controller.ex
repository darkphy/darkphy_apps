defmodule DarkphyWeb.SubdomainPageController do
  use DarkphyWeb, :controller

  def index(conn, _params) do
    Phoenix.Controller.render(conn, DarkphyWeb.PageView,  "index.html", %{layout: {DarkphyWeb.LayoutView, "app_#{conn.private[:subdomain]}.html"}})
  end
end

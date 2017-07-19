defmodule DarkphyWeb.SubdomainRouter do
  use DarkphyWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", DarkphyWeb do
    pipe_through :browser # Use the default browser stack

    get "/", SubdomainPageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Darkphy do
  #   pipe_through :api
  # end
end

defmodule DarkphyWeb.SubdomainRouter do
  use DarkphyWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
    plug DarkphyWeb.Plug.Context
  end

  scope host: "api." do
    pipe_through :api

#    forward "/", Absinthe.Plug,
#      schema: DarkphyWeb.Schema

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: DarkphyWeb.Schema,
      interface: :simple,
      context: %{pubsub: DarkphyWeb.Endpoint}
  end

  scope "/", DarkphyWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", SubdomainPageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Darkphy do
  #   pipe_through :api
  # end
end

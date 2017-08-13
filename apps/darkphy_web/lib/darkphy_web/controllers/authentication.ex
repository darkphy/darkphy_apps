defmodule DarkphyWeb.Authentication do
  #import Plug.Conn
  use DarkphyWeb, :controller

  def index(conn, params) do
    """
    output =
      case params do
        %{"email" => email} ->
          lookup_with_email(email)
        _->
          Darkphy.API.Error.invalid_params()
        #Darkphy.Profile |> Darkphy.Repo.get_by(email: params)
      end
      json conn,output
      """
      json conn,5
  end
end

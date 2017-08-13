defmodule Auth do
  import Ecto.Query
  import ShorterMaps
  @moduledoc """
  Authentication System for platform.
  """

  @doc """
    Authenticate Email/username/phone with password
  """
  def authenticate(args) do
    defaults = %{email: "", password: ""}
    ~M{email, password} = merge_defaults(defaults, args)

      user = Auth.User.Credentials
      |> join(:inner, [u], pr in Darkphy.Base.Profile, u.id == pr.id)
      |> where([u, pr], u.email == ^email or pr.username == ^email)
      |> select([u],struct(u,[:id,:password]))
      |> Auth.Repo.one()

      if check_password(user, password) do
        {:ok,user}
      else
        {:error,"sorry not match pass bro"}
      end
  end

  defp check_password(user, password) do
    case user do
      nil -> false
      _-> Comeonin.Argon2.checkpw(password, user.password)
    end
  end

  defp merge_defaults(deflts, map) do
    Map.merge(deflts, map, fn _key, default, val -> val || default end)
  end
end

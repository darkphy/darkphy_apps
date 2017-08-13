defmodule Darkphy.Resolver.User do

  import Ecto.Query
  #alias Darkphy.User
  #alias Darkphy.Repo

  import Darkphy.Errors.Codes, only: [returnCode: 0]


  def find(_parent, args, _info) do
    case Darkphy.Repo.get(Darkphy.Base.Profile, args.id) do
      nil  -> {:error, "User id  not found"}
      user -> {:ok, user}
    end
  end
  def check_email(_parent, %{email: email}, _info) do
      case Auth.User.Credentials |>
        join(:inner, [u], pr in Darkphy.Base.Profile, u.id == pr.id)
        |> where([u, pr], u.email == ^email)
        |> select([u, pr],struct(pr,[:id,:name,:pp]))
        |> Auth.Repo.one()
      do
        nil -> returnCode()
        user -> {:ok, Map.merge(user,%{email: email})}
      end
  end

end

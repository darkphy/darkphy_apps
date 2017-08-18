defmodule Darkphy do
  @moduledoc """
   The basic main leyer logics
  """

alias Darkphy.Base
import Base.Normalize, only: [normalize_kind: 1]

  @doc """
    Get user by id
  """
  def authenticate(args) do
    Auth.authenticate(args)
  end
  def register(args) do
      with {:ok, id} <- Base.ItemEntity.create_entity(%{kind: "user" |> normalize_kind() }) do
        %Base.Profile{}
        |> Base.Profile.register_changeset(%{id: id, name: args.name})
        |> Base.Profile.register_insert()
      end
   end
end

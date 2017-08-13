defmodule Darkphy do
  @moduledoc """
   The basic main leyer logics
  """

  @doc """
    Get user by id
  """

  def authenticate(args) do
    Auth.authenticate(args)
  end
end

defmodule DarkphyWeb.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Darkphy.Repo
  alias Darkphy.ItemEntity

  def for_token(item = %ItemEntity{}), do: {:ok, "ItemEntity:#{item.id}"}
  def for_token(_), do: {:error, "Unknown resource type"}

  def from_token("ItemEntity:" <> id), do: {:ok, Repo.get(ItemEntity, String.to_integer(id))}
  def from_token(_), do: {:error, "Unknown resource type"}
end
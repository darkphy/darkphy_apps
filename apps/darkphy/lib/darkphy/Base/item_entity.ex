defmodule Darkphy.ItemEntity do
  use Ecto.Schema
  import Ecto.Changeset

  #import Darkphy.NormalizeComponents, only: [normalize_kind: 1]

  schema "item_entity" do
    field :kind, :integer
    field :temp_hash, :integer
  end


  @required_fields ~w(id kind)a
  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    snowflake = make_snowflake()
    params = Map.put(params, :id, snowflake)
    if !snowflake do
      false
    else
      struct
      |> cast(params,@required_fields)
      |> validate_required([:id,:kind])
    end
  end
  def create_entity(struct, params) do
      struct
      |> changeset(params)
      #|> validate_inclusion(:kind, ["user" |> normalize_kind(), "page" |> normalize_kind()])
  end
  def update_entity(struct, params) do
    struct
    |> cast(params,~w(id)a)
    |> validate_required([:id])
  end

  defp make_snowflake() do
    snowflake = Snowflake.next_id()
    case snowflake do
        {:ok, id} -> id
        _-> false
    end
  end

end

defmodule Darkphy.Base.ItemEntity do
  use Ecto.Schema
  import Ecto.Changeset

  import Darkphy.Base.Normalize, only: [normalize_kind: 1]
  import Darkphy.Errors.Codes, only: [returnCode: 1]
  alias Darkphy.Repo

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
      returnCode("entity_error")
    else
      struct
      |> cast(params,@required_fields)
      |> validate_required([:id,:kind])
    end
  end
  def create_entity(params) do
      %Darkphy.Base.ItemEntity{}
      |> changeset(params)
      |> validate_inclusion(:kind, ["user" |> normalize_kind(), "page" |> normalize_kind()])
      |> insert_entity()
  end
  def insert_entity(changeset) do
    case Repo.insert(changeset) do
      { :ok, struct } -> {:ok, struct.id}
      { :error, _ } -> returnCode("entity_error")
    end
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

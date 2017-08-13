defmodule Darkphy.Base.Profile do
  use Ecto.Schema
  import Ecto.Changeset

  schema "profiles" do
    field :kind, :string
    field :name, :string
    field :username, :string
    field :pp, :string
    field :cover, :string
    field :celeb, :integer
    field :created_at, :utc_datetime
    field :del, :integer

    timestamps()
  end


  @required_fields ~w(kind name username pp cover celeb created_at)a

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params,@required_fields)
    |> validate_required([:id,:name])
    #|> validate_format(:email,~r/@/)
    #|> unique_constraint([:username])
  end

  def register_changeset(struct, params \\ %{}) do
    params = Map.put(params, :created_at, Ecto.DateTime.utc |> Ecto.DateTime.to_string() )

    struct
    |> cast(params,~w(id name created_at)a)
    |> validate_required([:id,:name])
  end

end

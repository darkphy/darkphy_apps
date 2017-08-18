defmodule Darkphy.Base.Profile do
  use Ecto.Schema
  import Ecto.Changeset
  import Darkphy.Errors.Codes, only: [returnCode: 1]

  alias Darkphy.Repo

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
    IO.inspect("nigger")
    params = Map.put(params, :created_at, Ecto.DateTime.utc |> Ecto.DateTime.to_string() )
    struct
    |> cast(params,~w(id name created_at)a)
    |> validate_required([:id,:name])
  end

  def register_insert(profile_changeset) do
    IO.inspect("fuckyeah")
    case Repo.insert(profile_changeset) do
      { :ok, struct } -> {:ok, struct}
      { :error, _ } -> returnCode("invalid_params")
    end
  end

end

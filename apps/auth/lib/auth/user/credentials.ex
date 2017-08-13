defmodule Auth.User.Credentials do
  use Ecto.Schema
  import Ecto.Changeset
  alias Auth.User.Credentials


  schema "user_credentials" do
    field :email, :string
    field :password, :string
    field :emailCode, :string
    field :cookieCode, :string
    timestamps()
  end

  @doc false
  def changeset(%Credentials{} = account, attrs) do
    account
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
  end
end

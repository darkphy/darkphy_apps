defmodule DarkphyWeb.Schema.Types do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation

  object :item_entity do
    field :id, :id
    field :type, :string
  end
  object :user_credentials do
    field :id, :id
    field :email, :string
    field :password, :string
    field :access_token, :string
    field :refresh_token, :string
  end
  object :profiles do
    field :id, :id
    field :username, :string
    field :name, :string
    field :pp, :string
    field :cover, :string
    field :celeb, :integer
    field :created_at, :integer

    field :email, :string
    field :access_token, :string
    field :refresh_token, :string
  end
end

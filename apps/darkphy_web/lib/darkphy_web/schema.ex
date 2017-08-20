defmodule DarkphyWeb.Schema do
  use Absinthe.Schema

  alias Darkphy.Resolver

  import_types DarkphyWeb.Schema.Types

  query do

     field :oauth, :user_credentials do
       arg :email, non_null(:string)
       arg :password, non_null(:string)
       resolve &DarkphyWeb.Resolver.Auth.login/3
     end

     field :check_email, :profiles do
        arg :email, non_null(:string)
        resolve &Resolver.User.check_email/3
     end

  end


  mutation do

    field :join, :profiles do
      arg :name, :string
      resolve &DarkphyWeb.Resolver.Auth.join/3
    end

  end

end

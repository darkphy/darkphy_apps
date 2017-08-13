defmodule Auth.Repo.Migrations.CreateAccount do
  use Ecto.Migration

  def change do

    create table(:user_credentials,primary_key: false) do
      add :id, references(:profiles,on_delete: :delete_all)
      add :email, :string, size: 255
      add :password, :string, size: 255
      add :emailCode, :string, size: 255
      add :cookieCode, :string, size: 255
    end
    create table(:user_propertys,primary_key: false) do
      add :id, references(:profiles,on_delete: :delete_all)
      # add :music, :string, size: 255
      # add :video, :string, size: 255
      add :bio, :string, size: 255
      add :gender, :tinyint
      add :theme, :integer
      add :font, :integer
      add :timezone, :string
      add :timemachine, :"int unsigned"
    end

    create unique_index(:user_credentials, [:id])
    create unique_index(:user_propertys, [:id])
  end
end

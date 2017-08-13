defmodule Darkphy.Repo.Migrations.CreateBasic do
  use Ecto.Migration

  def change do

    create table(:item_entity,primary_key: false) do
      add :id, :"bigint unsigned", primary_key: true
      add :kind, :tinyint
      add :temp_hash, :"int unsigned"
      add :del, :tinyint, default: 0
    end

    create table(:profiles,primary_key: false) do
      add :id,references(:item_entity,on_delete: :delete_all)
      add :kind, :tinyint
      add :name, :string, size: 255
      add :username, :string, size: 100
      add :pp, :string, size: 255
      add :cover, :string, size: 255
      add :celeb, :tinyint
      add :created_at, :utc_datetime
      add :del, :tinyint , default: 0

      timestamps()
    end
    
    create unique_index(:profiles, [:username])
    create unique_index(:profiles, [:id])
    create index(:profiles, [:celeb])
    create index(:profiles, [:del])
  end
end

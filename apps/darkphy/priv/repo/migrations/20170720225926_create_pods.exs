defmodule Darkphy.Repo.Migrations.CreatePods do
  use Ecto.Migration

  def change do

    create table(:pods,primary_key: false) do
      add :id, references(:item_entity,on_delete: :delete_all)
      add :user_id, references(:profiles,on_delete: :delete_all)
      add :type, :tinyint, comment: "[0,1][public,invite-only]"
      add :code, :integer
      add :title, :string, size: 255
      add :del, :tinyint, default: 0

      timestamps()
    end

    create table(:pods_authorize,primary_key: false) do
      add :id, references(:pods,on_delete: :delete_all)
      add :user_id, references(:profiles)
      add :del, :tinyint, default: 0

      timestamps()
    end

    create unique_index(:pods, [:id])
    create unique_index(:pods, [:del])
  end
end

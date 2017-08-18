defmodule DarkphyWeb.Mixfile do
  use Mix.Project

  def project do
    [app: :darkphy_web,
     version: "0.0.1",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.4",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {DarkphyWeb.Application, []},
     extra_applications: [:logger, :runtime_tools]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
		[{:phoenix, "~> 1.3.0-rc",override: true},
		{:phoenix_pubsub, "~> 1.0"},
		{:phoenix_ecto, "~> 3.2"},
		{:phoenix_html, "~> 2.6"},
		{:phoenix_live_reload, "~> 1.0",only:  :dev},
		{:plug, "~> 1.4"},
		{:gettext, "~> 0.11"},
		{:cowboy, "~> 1.0"},
		{:guardian, "~> 0.14"},
		{:poison, "~> 3.1",override: true},
		{:darkphy, in_umbrella: true},
		{:absinthe, "~> 1.3"},
		{:absinthe_relay, "~> 1.3"},
		{:absinthe_plug, "~> 1.3"},
		{:absinthe_ecto, "~> 0.1.0"},
		{:redix, "~> 0.6.1"},
		{:jose, "~> 1.8"},
		{:cors_plug, "~> 1.4"}]

		#{:ecto_cassandra, "~> 1.0.0-beta.3"},
		#{:redix, ">= 0.0.0"},
		#{:recaptcha, "~> 2.0"},

	end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, we extend the test task to create and migrate the database.
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
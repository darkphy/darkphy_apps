defmodule AuthTest do
  use ExUnit.Case
  doctest Auth

  test "Comeonin Argon PassCorrect" do
    pass = ""
    assert Comeonin.Argon2.checkpw(pass, makepass(pass)) == true
  end

  test "Comeonin Argon PassWrong" do
    assert Comeonin.Argon2.checkpw("somethingelse", makepass("something")) == false
  end

  def makepass(pw) do
    Comeonin.Argon2.hashpwsalt(pw)
  end
end

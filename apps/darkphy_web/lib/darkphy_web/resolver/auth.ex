defmodule DarkphyWeb.Resolver.Auth do

alias DarkphyWeb.RedisConfigs

import Darkphy.Errors.Codes, only: [returnCode: 1]


  def join(_parent, args, _info) do
    with { :ok, user } <- Darkphy.register(args),
         { :ok, jwt, _ } <- Guardian.encode_and_sign(%Darkphy.Base.ItemEntity{id: user.id}, :access) do
            refresh_token = add_to_redis(user.id)
            {:ok, Map.merge(user,%{access_token: jwt,refresh_token: refresh_token})}
    end
  end
  def add_to_redis(id) do
    refresh_token = refresh_token_create()
    redis_conn = RedisConfigs.get_conn()
    RedisConfigs.set_refresh_token(redis_conn,refresh_token,id)
    RedisConfigs.stop_conn(redis_conn)
    refresh_token
  end
  def login(_parent, args, _info) do
    with { :ok, user } <- Darkphy.authenticate(args),
         { :ok, jwt, _ } <- Guardian.encode_and_sign(%Darkphy.Base.ItemEntity{id: user.id}, :access) do
           refresh_token = add_to_redis(user.id)
           {:ok, %{id: user.id,access_token: jwt,refresh_token: refresh_token}}
         else
         _err -> returnCode(6)
     end
   end

 def refresh_token_create() do
   min = 100000 #x100,000
   max = 100000000 #x10,00,00,000
   s = Hashids.new([
     salt: "Pt8IuV8qYAfbHNygqNh6-j3tyn0njYpaY76j6kUVp",
     min_len: 10,
   ])
   cipher1 = Hashids.encode(s, DateTime.utc_now() |> DateTime.to_unix())
   cipher2 = Hashids.encode(s, Enum.random(min..max))
   cipher3 = Hashids.encode(s, Enum.random(min..max))
   Enum.join([cipher1,cipher3,cipher2], "-")
 end

end

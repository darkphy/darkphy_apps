defmodule Darkphy.Base.Normalize do

  @salt Hashids.new([
    salt: "bhd7i7FPegcSqHlWxews",
    min_len: 10,
  ])

  def normalize_kind(kind) do
    case kind do
      "user" -> 0
      "page" -> 1
    end
  end

  def encode_id(id) do
    Hashids.encode(@salt, id)
  end
  def decode_id(cipher) do
    Hashids.decode(@salt, cipher)
  end


end

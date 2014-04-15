json.array!(@games) do |game|
  json.extract! game, :id, :userid, :steps
  json.url game_url(game, format: :json)
end

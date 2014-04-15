class AddUseridToGames < ActiveRecord::Migration
  def change
    add_column :games, :userid, :integer
  end
end

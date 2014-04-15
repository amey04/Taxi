class AddStepsToGames < ActiveRecord::Migration
  def change
    add_column :games, :steps, :string
  end
end

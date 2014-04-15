class CreateGames < ActiveRecord::Migration
  def change
    drop_table :games
    create_table :games do |t|
      t.integer :userid
      t.string :steps
      t.timestamps
    end
  end
end

class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.references :location_set, foreign_key: true
      t.decimal :lat
      t.decimal :long

      t.timestamps
    end
  end
end

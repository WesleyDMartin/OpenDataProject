class AddValueToLocation < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :value, :int
  end
end

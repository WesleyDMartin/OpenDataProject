class AddPermitTypeToLocation < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :permit_type, :string
  end
end

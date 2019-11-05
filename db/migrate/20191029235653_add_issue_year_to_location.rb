class AddIssueYearToLocation < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :issue_year, :int
  end
end

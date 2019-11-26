class Location < ApplicationRecord
  belongs_to :location_set
  acts_as_mappable :default_units => :kms,
                    :default_formula => :flat,
                    :distance_field_name => :distance,
                    :lat_column_name => :lat,
                    :lng_column_name => :long
end

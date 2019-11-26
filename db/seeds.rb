require 'csv' 
@location_set = LocationSet.create(name: "ION_Stops")
csv_text = File.read('public/ION_Stops.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  @location_set.locations.create(lat: row[1], long: row[0], name: row[3])
end

@permit_set = LocationSet.create(name: "Building_Permits")
csv_text2 = File.read('public/FormattedLocations.csv')
csv2 = CSV.parse(csv_text2, :headers => true)
csv2.each do |row|
  @permit_set.locations.create(row.to_hash)
end
require 'csv'  
class StaticPagesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :active_set, only: [:map, :edit, :update, :destroy]
  def home
  end

  def map
        @location_set = LocationSet.where("name = ?", "ION_Stops").first.locations
        @types = LocationSet.last.locations.select(:permit_type).distinct.pluck(:permit_type)
        @start_value = params[:lower_value] || 10
        @start_year = params[:lower_year] || 2010
        @end_value = params[:upper_value] || 150000000
        @end_year = params[:upper_year] || 2019
        if !LocationSet.where("name = ?", "Building_Permits").empty?
            @permit_set = LocationSet.where("name = ?", "Building_Permits").last.locations.where(
                "issue_year >= ? and issue_year <= ? and value >= ? and value <= ?", @start_year, @end_year, @start_value, @end_value)
        else
            @permit_set = []
        end
        puts @permit_set.count
    end

  def help
  end

  def about
  end

  def data
    if params[:anything]
        @selection = params[:anything][:station_selection] || "Willis Way"
    else
        @selection = params[:station_selection] || "Willis Way"
    end
    @start_year = params[:lower_year] || 2010
    @end_year = params[:upper_year] || 2019
    @distance = params[:distance] || 1
    @stop_names = LocationSet.where("name = ?", "ION_Stops").first.locations.map{|l| l.name}
    @station = LocationSet.where("name = ?", "ION_Stops").first.locations.where("name = ?", @selection).first
    @nearby_stations = Location.within(@distance, :origin => @station).all.where(
        "issue_year >= ? and issue_year <= ?", @start_year, @end_year)
    @count = @nearby_stations.count
    @sum = 0
    @max = @nearby_stations.order("value DESC").first
    puts @max.value
    @nearby_stations.each do |s|
        # @max = ((@max.value || 0) <= (s.value || 0)) ? s : @max
        @sum += s.value || 0
    end
    if @count > 0
        @average = (@sum/@count).to_i
    else
        @average = 0
    end
  end

  
  def pluralize_without_count(count, noun, text = nil)
    if count != 0
      count == 1 ? "#{noun}#{text}" : "#{noun.pluralize}#{text}"
    end
  end
  
  private
  
      def active_set
          @current_set = LocationSet.where("name = ?", "Building_Permits").last
      end
end

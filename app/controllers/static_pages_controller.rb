require 'csv'  
class StaticPagesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :active_set, only: [:map, :edit, :update, :destroy]
  def home
  end

  def map
        @location_set = LocationSet.where("name = ?", "ION_Stops").first.locations
        @types = LocationSet.last.locations.select(:permit_type).distinct.pluck(:permit_type)
        @start_value = 800000
        @start_year = 2018
        @permit_set = LocationSet.where("name = ?", "Building_Permits").last.locations.where("issue_year >= ? and value >= ?", @start_year, @start_value)
    end

  def help
  end

  def about
  end

  def data
  end
    
  def update
      @location_set = LocationSet.where("name = ?", "ION_Stops").first.locations
      @types = LocationSet.last.locations.select(:permit_type).distinct.pluck(:permit_type)
      @start_value = params[:lower_value]
      @start_year = params[:lower_year]
      @permit_set = LocationSet.where("name = ?", "Building_Permits").last.locations.where("issue_year >= ? and value >= ?", @start_year, @start_value)
  end
  
  private
  
      def active_set
          @current_set = LocationSet.where("name = ?", "Building_Permits").last
      end
end

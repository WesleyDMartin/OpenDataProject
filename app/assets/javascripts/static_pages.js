// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var map = null;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var infowindow = new google.maps.InfoWindow();

var permit_locations = [];
var firstLoad = true;

/*	Function	: initMap
*	Descripton	: Loads the map for the first time, adding all of the LRT stop
*				: locations and all the building permit locations
*	Parameters	: Three arrays, each the same length, with the latitude, longitude, 
*               : and name of each location
*	Returns		: nil
**/
function initMap(lat, lng, name) {
    firstLoad = false;
    var myCoords = new google.maps.LatLng(lat[10], lng[10]);
    var mapOptions = {
    center: myCoords,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var i;
    var marker;
    for (i = 0; i < lat.length; i++) {  
        marker = new google.maps.Marker({
             position: new google.maps.LatLng(lat[i], lng[i]),
             map: map
        });
    
        // Handle click (move to detailed location page)
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
             return function() {
                    $("#anything_station_selection")[0].value = name[i];
                    
                    $("#anything_lower_year")[0].value = $("#lower_year")[0].value;
                    $("#anything_upper_year")[0].value = $("#upper_year")[0].value;

                    $("#data_form").submit();
             }
        })(marker, i));
        
        // Handle the mouse over (show the location name)
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
             return function() {
                 infowindow.setContent(name[i]);
                 infowindow.open(map, marker);
             }
        })(marker, i));
        
        // Handle the mouse exit (hide the location name)
        google.maps.event.addListener(marker, 'mouseexit', (function(marker, i) {
             return function() {
                 infowindow.close()
             }
        })(marker, i));
    }
}

/*	Property	: Indicates if this is the first time the map is loading */
function firstLoad(){
    return firstLoad;
}


/*	Function	: addMarker
*	Descripton	: Used to add either building permit location to the map
*				: Note: will initialize map if map is null
*	Parameters	: lat - latitude of position
*               : lng - longitude of position
*               : val - value of marker (in this case, permit value)
*	Returns		: nil
**/
function clearOverlays() {
  for (var i = 0; i < permit_locations.length; i++ ) {
    permit_locations[i].setMap(null);
  }
  permit_locations.length = 0;
}


/*	Function	: addMarker
*	Descripton	: Used to add building permit locations to the map
*				: Note: will initialize map if map is null
*	Parameters	: lat - latitude of position
*               : lng - longitude of position
*               : val - value of marker (in this case, permit value)
*	Returns		: nil
**/
function addMarker(lat, lng, val) {
    if (map == null) {
        initMap(lat, lng);
    } else {
        var i;
        for (i = 0; i < lat.length; i++) {
            // The locations need to be weighted based off of value for the heat map
            // This value: 5*val[i]/100000000, gave the best balance between showing
            // most low end values while not overwhelming the map with the large values
            permit_locations.push({location: new google.maps.LatLng(lat[i], lng[i]), weight: (5*val[i]/100000000)})
        }
        
        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: permit_locations,
          radius: 50
        });
        heatmap.setMap(map);
    }

}
// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var map = null;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var infowindow = new google.maps.InfoWindow();

var permit_locations = [];
var firstLoad = true;
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
    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
             return function() {
                    $("#anything_station_selection")[0].value = name[i];
                    
                    $("#anything_lower_year")[0].value = $("#lower_year")[0].value;
                    $("#anything_upper_year")[0].value = $("#upper_year")[0].value;

                    $("#data_form").submit();
             }
        })(marker, i));
    
        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
             return function() {
                 infowindow.setContent(name[i]);
                 infowindow.open(map, marker);
             }
        })(marker, i));
    
        google.maps.event.addListener(marker, 'mouseexit', (function(marker, i) {
             return function() {
                 infowindow.close()
             }
        })(marker, i));
    }
}

function firstLoad(){
    return firstLoad;
}

function clearOverlays() {
  for (var i = 0; i < permit_locations.length; i++ ) {
    permit_locations[i].setMap(null);
  }
  permit_locations.length = 0;
}

function addMarker(lat, lng, val) {
    if (map == null)
    {
        initMap(lat, lng);
    }
    else
    {
        var i;
        var image;
        var topEnd = Math.log(150000000);
        for (i = 0; i < lat.length; i++) {  
        //   image = {
        //                 url: iconBase + 'parking_lot_maps.png',
        //                 // This marker is 20 pixels wide by 32 pixels high.
        //                 scaledSize: new google.maps.Size(15+(32*val[i]/100000000), 15+(32*val[i]/100000000)),
        //                 // The origin for this image is (0, 0).
        //                 origin: new google.maps.Point(0, 0),
        //                 // The anchor for this image is the base of the flagpole at (0, 32).
        //                 anchor: new google.maps.Point(0, 32)
        //               };
        //     marker = new google.maps.Marker({
        //          position: new google.maps.LatLng(lat[i], lng[i]),
        //          map: map,
        //          icon: image
        //     });
        
        //     google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //          return function() {
        //              infowindow.setContent(lat[i]);
        //              infowindow.open(map, marker);
        //          }
        //     })(marker, i));
        
            permit_locations.push({location: new google.maps.LatLng(lat[i], lng[i]), weight: (5*val[i]/100000000)})
        }  
        // marker = new google.maps.Marker({
        //      position: new google.maps.LatLng(lat[i], lng[i]),
        //      map: map
        // });
    
        // google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //      return function() {
        //          infowindow.setContent(lat[i]);
        //          infowindow.open(map, marker);
        //      }
        // })(marker, i));
        
        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: permit_locations,
          radius: 50
        });
        heatmap.setMap(map);
    }

}
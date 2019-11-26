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
                 infowindow.setContent("test");
                 infowindow.open(map, marker);
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




// function initMap2() {
//     var lat = document.getElementById('place_latitude').value;
//     var lng = document.getElementById('place_longitude').value;
    
//     // if not defined create default position
//     if (!lat || !lng){
//         lat=51.5;
//         lng=-0.125;
//         document.getElementById('place_latitude').value = lat;
//         document.getElementById('place_longitude').value = lng;
//     }
//     var myCoords = new google.maps.LatLng(lat, lng);
//     var mapOptions = {
//     center: myCoords,
//     zoom: 14
//     };
//     var map = new google.maps.Map(document.getElementById('map2'), mapOptions);
//     var marker = new google.maps.Marker({
//         position: myCoords,
//         animation: google.maps.Animation.DROP,
//         map: map,
//         draggable: true
//     });
//     // refresh marker position and recenter map on marker
//     function refreshMarker(){
//         var lat = document.getElementById('place_latitude').value;
//         var lng = document.getElementById('place_longitude').value;
//         var myCoords = new google.maps.LatLng(lat, lng);
//         marker.setPosition(myCoords);
//         map.setCenter(marker.getPosition());   
//     }
//     // when input values change call refreshMarker
//     document.getElementById('place_latitude').onchange = refreshMarker;
//     document.getElementById('place_longitude').onchange = refreshMarker;
//     // when marker is dragged update input values
//     marker.addListener('drag', function() {
//         latlng = marker.getPosition();
//         newlat=(Math.round(latlng.lat()*1000000))/1000000;
//         newlng=(Math.round(latlng.lng()*1000000))/1000000;
//         document.getElementById('place_latitude').value = newlat;
//         document.getElementById('place_longitude').value = newlng;
//     });
//     // When drag ends, center (pan) the map on the marker position
//     marker.addListener('dragend', function() {
//         map.panTo(marker.getPosition());   
//     });
// }
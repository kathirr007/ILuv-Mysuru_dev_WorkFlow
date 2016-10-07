var lati = arr[idx].lati,
    longi = arr[idx].longi;
lati = lati ? arr[idx].lati.substr(0, 7) : "N/A",
    longi = longi ? arr[idx].longi.substr(0, 7) : "N/A";
console.log("selected page Latitude is " + lati + " & Longitude is " + longi);

var center = new google.maps.LatLng(lati, longi);
var factory = new google.maps.LatLng(lati, longi);

function initialize() {
    var mapOptions = { center: center, zoom: 16, mapTypeId: google.maps.MapTypeId.ROADMAP };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    // marker options
    var marker = new google.maps.Marker({ position: factory, map: map, title: arr[idx].title });
}
google.maps.event.addDomListener(window, 'load', initialize);
}
});

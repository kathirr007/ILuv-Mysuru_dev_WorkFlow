var xmlhttp = new XMLHttpRequest(),
	path = location.pathname.split(".")[0].split("/").pop(),
	pathname = path.includes("detail") ? path.split("detail")[0] : path,
	pathPid = location.href.slice(-16),
	url = "master/json/" + pathname + ".json";
	$('body').addClass(pathname);
console.log(pathname);console.log(pathPid);console.log(url);
xmlhttp.onreadystatechange=function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		myFunction(xmlhttp.responseText);
	}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
var arr = JSON.parse(response),
	i, out = "<div>", out2 = "<div>", out3 = "<div id=\"details\">", maps = "<div id=\"map-canvas\">";

for(i = 0; i < arr.length; i++) {
var gall = arr[i].galleries,
	thumbImage;
	if (gall.length === 0) {
	thumbImage = "master/images/noimg.png"; }
	else {
	thumbImage = encodeURI(arr[i].galleries[0].img_name);
	}
    out += "<a href=" + pathname + "detail.html?pid=" + arr[i].placeid + " style=\"text-decoration:none; \"><div id=\"placeblocks\"><div style=\"background-color:rgba(250, 250, 250, 1.0);\"><div class=\"text\"><ul><li style=\"width:40%;\"><img src=" + thumbImage + " alt=\"\" width=\"125\" height=\"75\" class=\"img\" style=\"border:2px solid #d1cece;\"></li>";
    out += "<li style=\"width:60%; line-height:18px;\"><span style=\"color:#448802; font-family: 'Abel', sans-serif; font-size:16px; font-weight:bold;\"> "+arr[i].title +"</span><br><span style=\"color:#222222; font-family: 'Abel', sans-serif; font-size:14px; \"> "+arr[i].address +"</span><div style=\"color:#000; padding-top:15px;\"><ul style=\"float:left;\"><li><img src=\"master\/images\/adventure.png\"></li><li style=\"padding-left:15px;\"><img src=\"master\/images\/rating.png\"></li><li><span style=\"color:#989999; font-family: 'Abel', sans-serif; padding-left:15px;\">7.5 kms</span></li></ul></div></li>";
    out += "</ul></div></div></div><div class=\"clear\"></div><div class=\"clear\"></div></a>";
    out += "</div>";
}
console.log(arr);
$.each(arr,function(idx){
if(arr[idx].placeid == pathPid) {
var sliderImagesList = arr[idx].galleries;
console.log(sliderImagesList);
function buildSlider(sliderImagesList){
	var sliderContent = '';
	sliderContent += '<div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 1300px; height: 500px; overflow: hidden; visibility: hidden;">\
		  <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 1300px; height: 500px; overflow: hidden;">';
	sliderImagesList.forEach(function(item){
		var img_name = encodeURI(item.img_name);
console.log(img_name);
		sliderContent += '<div data-p="225.00" style="display: none;"><img data-u="image" src="'+item.img_name+'"/></div>';
	});
		sliderContent += '<div data-p="225.00" data-po="80% 55%" style="display: none;"> <a href="http://theoreminc.net"><img data-u="image" src="master/images/theorem.jpg"/></a></div> \
		</div>\
		  <div data-u="navigator" class="jssorb05" style="bottom:16px;right:16px;" data-autocenter="1">\
			<div data-u="prototype" style="width:16px;height:16px;"></div>\
		  </div>\
		  <span data-u="arrowleft" class="jssora22l" style="top:0px;left:12px;width:40px;height:58px;" data-autocenter="2"></span> \
		  <span data-u="arrowright" class="jssora22r" style="top:0px;right:12px;width:40px;height:58px;" data-autocenter="2"></span> \
		</div>';
console.log(sliderContent);		
	$("#slider-content").append(sliderContent);
}	
	buildSlider(sliderImagesList);
	jssor_1_slider_init();
	
out2 += "<p style=\"color:#b65c39; font-family: 'Abel', sans-serif; font-size:16px; font-weight:bold; padding:10px;\">" + arr[idx].title + "</p></div>";
out2 += "</div>";
out3 += "<div>"+ $('<div/>').html(arr[idx].details).text() +"</div>";
out3 += "</div>";
maps += "</div>";
 
var lati = arr[idx].lati.substr(0, 7);
var longi = arr[idx].longi.substr(0, 7);
console.log ("selected page Latitude is " + lati + " & Longitude is " + longi);

var center = new google.maps.LatLng(lati, longi);
var factory = new google.maps.LatLng(lati, longi);

function initialize() {
  var mapOptions = {center: center, zoom: 16, mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
  // marker options
  var marker = new google.maps.Marker({position: factory, map: map, title: arr[idx].title});
}
google.maps.event.addDomListener(window, 'load', initialize);
}
});
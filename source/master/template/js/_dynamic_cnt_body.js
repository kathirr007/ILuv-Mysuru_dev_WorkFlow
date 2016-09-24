var xmlhttp = new XMLHttpRequest(),
	path = location.pathname.split(".")[0].split("/").pop(),
	pathname = path.includes("detail") ? path.split("detail")[0] : path,
	pathPid = location.href.slice(-16),
	url = "master/json/" + pathname + ".json";

// custom styles
	$('body').addClass(pathname);
	$('a[href="#id02"]').click(function(){$('.detailblock').css({"padding":"50px 0px 0px 0px !important;"})});

console.log(pathname);console.log(pathPid);console.log(url);

<!-- @include _javascript_ajax.js -->

function myFunction(response) {
var arr = JSON.parse(response),
	i, out = "<div>", out2 = "<div>", out3 = "<div id=\"details\">", maps = "<div id=\"map-canvas\">";

<!-- @include _listing_contents.js -->

console.log(arr);
$.each(arr,function(idx){
if(arr[idx].placeid == pathPid) {
var sliderImagesList = arr[idx].galleries,
	nearestplace = arr[idx].nearestplace,
	nearestplace = nearestplace ? arr[idx].nearestplace.split("\r\n") : [];
console.log(sliderImagesList);
console.log(nearestplace);



<!-- @include _dynamic_slider.js -->
<!-- @include _nearestplaces.js -->

out2 += "<p style=\"color:#b65c39; font-family: 'Abel', sans-serif; font-size:16px; font-weight:bold; padding:10px;\">" + arr[idx].title + "</p></div>";
out2 += "</div>";
out3 += "<div>"+ $('<div/>').html(arr[idx].details).text() +"</div>";
out3 += "</div>";
maps += "</div>";


<!-- @include _google_map.js -->
<!-- @include _listing_search.js -->
<!-- @include _dynamic_cnt_insert.js -->



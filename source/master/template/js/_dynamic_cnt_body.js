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
	i, ratingstar, out = "<div>", out2 = "<div>", out3 = "<div id=\"details\">", maps = "<div id=\"map-canvas\">";

<!-- @include _listing_contents.js -->

console.log(arr);
$.each(arr,function(idx){
if(arr[idx].placeid == pathPid) {
var sliderImagesList = arr[idx].galleries,
	nearestplace = arr[idx].nearestplace,
	nearestplace = nearestplace ? arr[idx].nearestplace.split("\r\n") : [];


console.log(nearestplace);


<!-- @include _dynamic_slider.js -->
<!-- @include _nearestplaces.js -->
$(function readmore(){
var details = $('#id04 #details');	
console.log(details);
$(details).each(function(event){
	var max_length = 150; 
	if($(this).html().length > max_length){
			var short_content 	= $(this).html().substr(0,max_length);
			var long_content	= $(this).html().substr(max_length);
			$(this).html(short_content+
						 '<a href="#" class="read_more"><br/>Read More</a>'+
						 '<span class="more_text" style="display:none;">'+long_content+'</span>');
 			$(this).find('a.read_more').click(function(event){ 
				event.preventDefault(); 
				$(this).hide();
				$(this).parents('.item').find('.more_text').show();
		 	});
		}
});
});

out2 += '<p style="color:#b65c39; font-family: \'Abel\', sans-serif; font-weight:bold; padding:10px;">' + arr[idx].title + '</p></div>';
out2 += '</div>';
out3 += '<div>'+ $("<div/>").html(arr[idx].details).text() +'</div>';
out3 += '</div>';
maps += '</div>';


<!-- @include _google_map.js -->
<!-- @include _listing_search.js -->
<!-- @include _dynamic_cnt_insert.js -->

// $(function(){
// var details = $('#id04 #details').text();	
// console.log(details);
// $(details).each(function(event){
// 	var max_length = 150; 
// 	if($(this).html().length > max_length){
// 			var short_content 	= $(this).html().substr(0,max_length);
// 			var long_content	= $(this).html().substr(max_length);
// 			$(this).html(short_content+
// 						 '<a href="#" class="read_more"><br/>Read More</a>'+
// 						 '<span class="more_text" style="display:none;">'+long_content+'</span>');
//  			$(this).find('a.read_more').click(function(event){ 
// 				event.preventDefault(); 
// 				$(this).hide();
// 				$(this).parents('.item').find('.more_text').show();
// 		 	});
// 		}
// });
// });


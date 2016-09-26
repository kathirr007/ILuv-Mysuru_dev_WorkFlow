$(document).on("keyup","input[name='q']",function(){
	var searchValue = $(this).val(),
		searchQuery = searchValue.toLowerCase();
	console.log(searchQuery);
	var searchResult = '';
	if(searchQuery == ''){
		$(".search-result").empty();
	}
	else{
		$.each(arr,function(i,item){
			var searchTitle = arr[i].title.toLowerCase(),
				gall = arr[i].galleries,
				thumbImage;
				ratingstars = arr[i].ratingstar;
				
console.log(searchTitle);

function getstars(ratingstars){
				ratingstar = "";
					for (j=0; j < ratingstars; j++) {
						ratingstar += '<img src="master/images/ratingstar.png" alt="" />';
					}
				return ratingstar;
				};

				if (gall.length === 0) {
				thumbImage = "master/images/noimg.png"; }
				else {
				thumbImage = encodeURI(arr[i].galleries[0].img_path);
				}

			if(searchTitle.indexOf(searchQuery) != -1){
				searchResult += '<a href=' + pathname + 'detail.html?pid=' + arr[i].placeid + ' style="text-decoration:none;">\
								<div id="placeblocks">\
									<div style="background-color:rgba(250, 250, 250, 1.0);">\
										<div class="text">\
											<ul>\
											<li style="width:40%;">\
												<img src="' +thumbImage+' " alt="" width="125" height="75" class="img" style="border:2px solid #d1cece;">\
											</li>\
											<li style="width:60%; line-height:18px;">\
												<span style="color:#448802; font-family:Abel, sans-serif; font-size:16px; font-weight:bold;"> "'+arr[i].title +'"</span><br>\
												<span style="color:#222222; font-family:Abel, sans-serif; font-size:14px;"> "'+arr[i].address +'"</span>\
												<div style="color:#000; padding-top:15px;"><ul style="float:left;"><li><img src="master/images/adventure.png"></li><li style="padding-left:15px;">'+getstars(ratingstars)+'</li></ul></div>\
											</li>';
				
				searchResult += '</ul></div></div></div><div class="clear"></div><div class="clear"></div></a>';
			}
		});
		if(searchResult == ''){
			searchResult += '<p style="color:#FFFFFF;margin-left:5px;margin-bottom:30px;">No results found.</p>';
		}
		$(".search-result").empty().append('<h2 style="color:#FFFFFF;margin:10px 5px;">Search results related to the keyword "'+searchValue+'"</h2>'+searchResult);
	}
});
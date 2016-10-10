function buildSlider(sliderImagesList) {
    var sliderContent = '';
    sliderContent += '<div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 600px; height: 285px; overflow: hidden; visibility: hidden;">\
		  <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 600px; height: 285px; overflow: hidden;">';
    sliderImagesList.forEach(function(item) {
        var img_name = encodeURI(item.img_path);
        sliderContent += '<div data-p="225.00" style="display: none;"><img data-u="image" src="' + item.img_path + '"/></div>';
    });
    sliderContent += '<div data-p="225.00" data-po="80% 55%" style="display: none;"> <a href="http://theoreminc.net"><img data-u="image" src="assets/images/theorem.jpg"/></a></div> \
		</div>\
		  <div data-u="navigator" class="jssorb05" style="bottom:16px;right:16px;" data-autocenter="1">\
			<div data-u="prototype" style="width:16px;height:16px;"></div>\
		  </div>\
		  <span data-u="arrowleft" class="jssora22l" style="top:0px;left:12px;width:40px;height:58px;" data-autocenter="2"></span> \
		  <span data-u="arrowright" class="jssora22r" style="top:0px;right:12px;width:40px;height:58px;" data-autocenter="2"></span> \
		</div>';

    $("#slider-content").append(sliderContent);
}
buildSlider(sliderImagesList);
jssor_1_slider_init();

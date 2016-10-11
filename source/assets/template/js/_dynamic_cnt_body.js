window.onload = function() {
        var xmlhttp = new XMLHttpRequest(),
            path = location.href.split(".html")[0].split("/").pop(),
            pathname;
        if (path.indexOf("detail") !== -1) {
            pathname = path.split("detail")[0];
        } else {
            pathname = path;
        }
        var pathPid = location.href.slice(-16),
            url = "assets/json/" + pathname + ".json";
        // @include _sanDetails.js

        // custom styles
        $('body').addClass(pathname);
        $('a[href="#id02"]').click(function() { $('.detailblock').css({ "padding": "50px 0px 0px 0px !important;" }) });

        console.log(path);
        console.log(pathname);
        console.log(pathPid);
        console.log(url);

        // @include _javascript_ajax.js

        function myFunction(response) {
            var arr = JSON.parse(response),
                i, ratingstar, out = "",
                out2 = "<div>",
                out3 = "<div id=\"details\">",
                maps = "<div id=\"map-canvas\">";

            // @include _listing_contents.js 

            console.log(arr);
            $.each(arr, function(idx) {
                        if (arr[idx].placeid == pathPid) {
                            var sliderImagesList = arr[idx].galleries,
                                nearestplace = arr[idx].nearestplace,
                                nearestplace = nearestplace ? arr[idx].nearestplace.split("\r\n") : [];


                            console.log(nearestplace);

                            // @include _dynamic_slider.js
                            // @include _nearestplaces.js
                            $(function readmore() {
                                var details = $('#id04 #details');
                                console.log(details);
                                $(details).each(function(event) {
                                    var max_length = 150;
                                    if ($(this).html().length > max_length) {
                                        var short_content = $(this).html().substr(0, max_length);
                                        var long_content = $(this).html().substr(max_length);
                                        $(this).html(short_content +
                                            '<a href="#" class="read_more"><br/>Read More</a>' +
                                            '<span class="more_text" style="display:none;">' + long_content + '</span>');
                                        $(this).find('a.read_more').click(function(event) {
                                            event.preventDefault();
                                            $(this).hide();
                                            $(this).parents('.item').find('.more_text').show();
                                        });
                                    }
                                });
                            });

                            var sanDetails = replaceHtmlEntites(arr[idx].details);
                            
                            out2 += '<p style="color:#b65c39; font-family: \'Abel\', sans-serif; font-weight:bold; padding:10px;">' + arr[idx].title + '</p></div>';
                            out2 += '</div>';
                            out3 += '<div>' + $("<div/>").html(sanDetails).text() + '</div>';
                            out3 += '</div>';
                            maps += '</div>';


                            // @include _google_map.js
                            // @include _listing_search.js
                            // @include _dynamic_cnt_insert.js
                        }();

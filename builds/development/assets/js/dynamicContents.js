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

        // custom styles
        $('body').addClass(pathname);
        $('a[href="#id02"]').click(function() { $('.detailblock').css({ "padding": "50px 0px 0px 0px !important;" }) });

        console.log(path);
        console.log(pathname);
        console.log(pathPid);
        console.log(url);

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                myFunction(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        

        function myFunction(response) {
            var arr = JSON.parse(response),
                i, ratingstar, out = "",
                out2 = "<div>",
                out3 = "<div id=\"details\">",
                maps = "<div id=\"map-canvas\">";

            for (i = 0; i < arr.length; i++) {
                var gall = arr[i].galleries,
                    thumbImage;
                ratingstars = arr[i].ratingstar,
                    kms = arr[i].nearkm,
                    kms = kms ? kms : "- ";
            
                function getstars(ratingstars) {
                    ratingstar = "";
                    for (j = 0; j < ratingstars; j++) {
                        ratingstar += '<img src="assets/images/ratingstar.png" alt="" />';
                    }
                    return ratingstar;
                };
                // var actualRating = getstars(ratingstars);
                if (gall.length === 0) {
                    thumbImage = "assets/images/noimg.png";
                } else {
                    thumbImage = encodeURI(arr[i].galleries[0].img_path);
                }
                out += '<li class="list-items"><a class="clearfix" style="display:block;" href="' + pathname + 'detail.html?pid='+arr[i].placeid+'">\
                        <section class="list-contents clearfix"><figure><img src="'+thumbImage+'" alt="" width="125" height="75" /></figure>\
                        <aside><h4>'+arr[i].title+'</h4><p>'+arr[i].address+'</p><figure class="ratingstars">'+getstars(ratingstars)+'</figure>'+kms+'Kms from city</aside>\
                        </section>\
                        </a>\
                        </li>'
                // out += "<div><a href=\"" + pathname + "detail.html?pid=" + arr[i].placeid + "\" style=\"text-decoration:none;\"><div id=\"placeblocks\"><div style=\"background-color:rgba(250, 250, 250, 1.0);\"><div class=\"text\"><ul><li style=\"width:40%;\"><img src=" + thumbImage + " alt=\"\" width=\"125\" height=\"75\" class=\"img\" style=\"border:2px solid #d1cece;\"></li>";
                // out += "<li style=\"width:60%; line-height:18px;\"><span style=\"color:#448802; font-family: \"Abel\", sans-serif; font-size:16px; font-weight:bold;\">" + arr[i].title + "</span><br><span style=\"color:#222222; font-family: \"Abel\", sans-serif; font-size:14px;\">" + arr[i].address + "</span><div style=\"color:#000; padding-top:15px;\"><ul style=\"float:left;\"><li>" + getstars(ratingstars) + "</li><li style=\"padding-left:15px;\">" + kms + "Kms from city</li></ul></div></li>";
                // out += "</ul></div></div></div><div class=\"clear\"></div><div class=\"clear\"></div></a>";
                // out += "</div>";
            }
            

            console.log(arr);
            $.each(arr, function(idx) {
                        if (arr[idx].placeid == pathPid) {
                            var sliderImagesList = arr[idx].galleries,
                                nearestplace = arr[idx].nearestplace,
                                nearestplace = nearestplace ? arr[idx].nearestplace.split("\r\n") : [];


                            console.log(nearestplace);

                            function buildSlider(sliderImagesList) {
                                var sliderContent = '';
                                sliderContent += '<div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 1300px; height: 500px; overflow: hidden; visibility: hidden;">\
                            		  <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 1300px; height: 500px; overflow: hidden;">';
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
                            
                            	var nearestplaces = '';
                            	nearestplaces += '<div><ul>';
                            	nearestplace.forEach(function(item) {
                            	    nearestplaces += '<li>' + item + '</li>';
                            	});
                            	nearestplaces += '</ul></div>'
                            
                            	$(nearestplaces).insertAfter("#id05 h2");
                            
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

                            out2 += '<p style="color:#b65c39; font-family: \'Abel\', sans-serif; font-weight:bold; padding:10px;">' + arr[idx].title + '</p></div>';
                            out2 += '</div>';
                            out3 += '<div>' + $("<div/>").html(arr[idx].details).text() + '</div>';
                            out3 += '</div>';
                            maps += '</div>';


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
                            
                            $(document).on("keyup", "input[name='q']", function() {
                                var searchValue = $(this).val(),
                                    searchQuery = searchValue.toLowerCase();
                                console.log(searchQuery);
                                var searchResult = '';
                                if (searchQuery == '') {
                                    $(".search-result").empty();
                                } else {
                                    $.each(arr, function(i, item) {
                                        var searchTitle = arr[i].title.toLowerCase(),
                                            gall = arr[i].galleries,
                                            thumbImage;
                                        ratingstars = arr[i].ratingstar,
                                            kms = arr[i].nearkm;
                            
                                        console.log(searchTitle);
                            
                                        function getstars(ratingstars) {
                                            ratingstar = "";
                                            for (j = 0; j < ratingstars; j++) {
                                                ratingstar += '<img src="assets/images/ratingstar.png" alt="" />';
                                            }
                                            return ratingstar;
                                        };
                            
                                        if (gall.length === 0) {
                                            thumbImage = "assets/images/noimg.png";
                                        } else {
                                            thumbImage = encodeURI(arr[i].galleries[0].img_path);
                                        }
                            
                                        if (searchTitle.indexOf(searchQuery) != -1) {
                                            searchResult += '<li class="list-items"><a class="clearfix" style="display:block;" href="' + pathname + 'detail.html?pid='+arr[i].placeid+'">\
                                        <section class="list-contents clearfix"><figure><img src="'+thumbImage+'" alt="" width="125" height="75" /></figure>\
                                        <aside><h4>'+arr[i].title+'</h4><p>'+arr[i].address+'</p><figure class="ratingstars">'+getstars(ratingstars)+'</figure>'+kms+'Kms from city</aside>\
                                        </section>\
                                        </a>\
                                        </li>';
                                        }
                                    });
                                    if (searchResult == '') {
                                        searchResult += '<p style="color:#FFFFFF;margin-left:5px;margin-bottom:30px;">No results found.</p>';
                                    }
                                    $(".search-result").empty().append('<h2 style="color:#FFFFFF;margin:10px 5px;">Search results related to the keyword "' + searchValue + '"</h2>' + searchResult);
                                }
                            });
                            
                            if (path.indexOf("detail") !== -1) {
                                document.getElementById("id02").innerHTML = out2;
                                document.getElementById("id03").innerHTML = maps;
                                document.getElementById("id04").innerHTML = out3;
                            } else {
                                document.getElementById("listings").innerHTML = out;
                            }
                            }
                            
                        }();

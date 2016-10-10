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

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

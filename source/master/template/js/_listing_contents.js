for(i = 0; i < arr.length; i++) {
var gall = arr[i].galleries,
	thumbImage;
	if (gall.length === 0) {
	thumbImage = "master/images/noimg.png"; }
	else {
	thumbImage = encodeURI(arr[i].galleries[0].img_path);
	}
    out += "<a href=" + pathname + "detail.html?pid=" + arr[i].placeid + " style=\"text-decoration:none; \"><div id=\"placeblocks\"><div style=\"background-color:rgba(250, 250, 250, 1.0);\"><div class=\"text\"><ul><li style=\"width:40%;\"><img src=" + thumbImage + " alt=\"\" width=\"125\" height=\"75\" class=\"img\" style=\"border:2px solid #d1cece;\"></li>";
    out += "<li style=\"width:60%; line-height:18px;\"><span style=\"color:#448802; font-family: 'Abel', sans-serif; font-size:16px; font-weight:bold;\"> "+arr[i].title +"</span><br><span style=\"color:#222222; font-family: 'Abel', sans-serif; font-size:14px; \"> "+arr[i].address +"</span><div style=\"color:#000; padding-top:15px;\"><ul style=\"float:left;\"><li><img src=\"master\/images\/adventure.png\"></li><li style=\"padding-left:15px;\"><img src=\"master\/images\/rating.png\"></li><li><span style=\"color:#989999; font-family: 'Abel', sans-serif; padding-left:15px;\">7.5 kms</span></li></ul></div></li>";
    out += "</ul></div></div></div><div class=\"clear\"></div><div class=\"clear\"></div></a>";
    out += "</div>";
}
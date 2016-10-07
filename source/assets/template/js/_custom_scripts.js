// custom scripts

// toggle collapsible contents icons
$(document).ready(function() {
    $("#accordion > div:nth-child(1) > a > div").click(function() {
        $(this).find('i').toggleClass('fa fa-chevron-right fa fa-chevron-down')
    });
});

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4) {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

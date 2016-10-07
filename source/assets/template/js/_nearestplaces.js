	var nearestplaces = '';
	nearestplaces += '<div><ul>';
	nearestplace.forEach(function(item) {
	    nearestplaces += '<li>' + item + '</li>';
	});
	nearestplaces += '</ul></div>'

	$(nearestplaces).insertAfter("#id05 h2");

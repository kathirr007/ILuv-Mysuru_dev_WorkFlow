function getDineRestaurants(fn) {

	readFile("dineRestaurants.json", fn);
}

function getHistoryGeography(fn) {

	readFile("historyGeography.json", fn);
}

function getHotelsLodging(fn) {

	readFile("hotelsLodging.json", fn);
}

function getLifestyleFashion(fn) {

	readFile("lifestyleFashion.json", fn);
}

function getPlacesInterest(fn) {

	readFile("placesInterest.json", fn);
}

function getUpcomingEvents(fn) {

	readFile("upcomingEvents.json", fn);
}

function readFile(fileName, fn) {

	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
		dirEntry.getFile(fileName, {create: false, exclusive: false}, function(fileEntry) {
			fileEntry.file(function (file) {
				var reader = new FileReader();

				reader.onloadend = function() {
					fn(this.result);
				};

				reader.readAsText(file);

			}, function () {
				console.log("error reading file");
			});
		});
	});
}
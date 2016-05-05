var cities, information, map, request, data, feature;

$.ajax({ url: 'portugal-cities-beautify.json', success: function (content) { cities = JSON.parse(content); } });

function initializeMap() {
	information = new google.maps.InfoWindow();
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 39.5398593, lng: -10.0970425 }, mapTypeId: google.maps.MapTypeId.HYBRID, disableDefaultUI: true, zoom: 7
	});

	google.maps.event.addListener(map, 'idle', function () {
		request = ''.concat(
			'http://api.openweathermap.org/data/2.5/box/city?bbox=', map.getBounds().getSouthWest().lng(), ',',
			map.getBounds().getNorthEast().lat(), ',', map.getBounds().getNorthEast().lng(), ',',
			map.getBounds().getSouthWest().lat(), ',', map.getZoom(), '&cluster=yes&format=json&APPID=b88846daa444a645bd342d557c28ce14'
		);

		$.ajax({ url: request, success: function (json) {
			if (json.list.length > 0) {
				data = { type: 'FeatureCollection', features: [] };
				map.data.forEach(function (feature) { map.data.remove(feature); });

				for (var i = 0; i < json.list.length; i++) {
					if (idExists(cities, json.list[i].id.toString())) {
						data.features.push(convertData(json.list[i]));
						map.data.addGeoJson(data);
					}
				}
			}
		} });
	});

	map.data.addListener('click', function (event) {
		information.setContent(
			''.concat(
				'<center><img src="', event.feature.getProperty('icon'),'"/></br>',
				'<strong>', event.feature.getProperty('city'), '</strong></br></br>',
				parseInt(event.feature.getProperty('temperature')), 'º C</br>',
				event.feature.getProperty('weather'), '</br></br>',
				'<strong>', event.feature.getProperty('coordinates'), '</strong></center>'
			)
		);

		information.setOptions({ position: { lat: event.latLng.lat(), lng: event.latLng.lng() } });
		information.open(map);
	});
};

function idExists(cities, id) { return cities.some(function (city) { return city.id === id; }); };

function convertData(weather) {
	feature = {
		type: 'Feature',
		properties: {
			icon: 'http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png', city: weather.name, temperature: weather.main.temp,
			weather: weather.weather[0].main, coordinates: [weather.coord.lon, weather.coord.lat]
		},
		geometry: { type: 'Point', coordinates: [weather.coord.lon, weather.coord.lat] }
	};

	map.data.setStyle(function (feature) { return { icon: { url: feature.getProperty('icon'), anchor: new google.maps.Point(30, 30) } } });
	return feature;
};
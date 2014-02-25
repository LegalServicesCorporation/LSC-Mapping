var pip = require('geojson-utils');
var map = L.mapbox.map('map', 'tmcw.map-oitj0si5')
    .setView([40, -74.50], 9);

var fl = L.geoJson().addTo(map);

$.ajax({
    url: 'Programs.json',
    success: function(programs) {
        $.ajax({
				url: 'Rectangles.json',
				dataType: 'json',
				success: function(dat) {
                $('#fm').on('submit', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
							$.ajax('http://www.mapquestapi.com/geocoding/v1/address?key=Fmjtd%7Cluur296an9%2Cb0%3Do5-90r514&location=' +
							encodeURIComponent($('#address').val())).done(function(res) {
									if (res.results && res.results[0] && res.results[0].locations && res.results[0].locations[0]) {
                              var areas = findLocation(dat, res.results[0].locations[0]);
                              if (areas.length) loadResults(res.results[0].locations[0], areas, programs);
                          }
                      });
                    return false;
                });
            },
				error: function(jqxhr, status, error) {
						alert("Status: " + status + ". Error: " + error);
				}
        });
    },
	 error: function(jqxhr, status, error) {
			alert("Status: " + status + ". Error: " + error);
	 }
});

function findLocation(index, ll) {

    var results = [];

    for (var i = 0; i < index.length; i++) {


     if (ll.displayLatLng.lat > index[i][0] &&
            ll.displayLatLng.lat < index[i][1] &&

            ll.displayLatLng.lng > index[i][2] &&
            ll.displayLatLng.lng < index[i][3]) {

		  
            results.push(index[i]);
        }

    }

    return results;
}

function loadResult(r, cb) {
	$.ajaxSetup({ cache: false });
	$.getJSON('geojson/' + r[4] + '.geojson').done(
		function(d) {
        cb(null, d);
		}
	);
}

var q = queue(1);

function loadResults(center, results, programs) {

    results.forEach(function(r) {
        q.defer(loadResult, r);
    });

    q.awaitAll(function(err, results) {

        var res = results.filter(
				function(r) {
					var inPolygon = false;
					for (var i = 0; i < r.features.length; i++) {
						inPolygon = inPolygon || gju.pointInPolygon(
							 {type: 'Point',
							 coordinates: [center.displayLatLng.lng, center.displayLatLng.lat]}
							, r.features[i].geometry
						);
					}
					return inPolygon;
        })[0];

        if (!res) return alert('No location found');

        fl.clearLayers();
        fl.addData(res);
        fl.addData({ type: 'Point', coordinates: [center.displayLatLng.lng, center.displayLatLng.lat] });
        map.fitBounds(fl.getBounds());

			var sa = res.features[0].properties["SA"]
        var $info = $('#info').html("");
            //.html(res.properties.Description);
        //var rno = $($('#info td')[1]).text().trim();

        for (var i = 0; i < programs.length; i++) {

            if (programs[i].Serv_Area_ID == sa) {
/*                for (var k in list[i]) {
                    $('<strong></strong>')
                        .text(k + ': ')
                        .appendTo($info);
                    $('<span></span>')
                        .text(list[i][k])
                        .appendTo($info);
                    $('<br />')
                        .appendTo($info);
                }*/
					 var $tr = $('<tr></tr>').appendTo($info)
					 $('<td><strong>Program Name: </strong></td>').appendTo($tr);
					 $('<td>' + programs[i]["R_Legalname"] + '</td>').appendTo($tr);
					 var $tr = $('<tr></tr>').appendTo($info)
					 $('<td><strong>Web Site: </strong></td>').appendTo($tr);
					 $('<td><a href="' +  programs[i]["Web_URL"] + '" target="_blank">' + programs[i]["Web_URL"] + '</a></td>').appendTo($tr);
					 var $tr = $('<tr></tr>').appendTo($info)
					 $('<td><strong>Phone: </strong></td>').appendTo($tr);
					 $('<td>' + programs[i]["Local_800"] + '</td>').appendTo($tr);
            }
        }
    });
}

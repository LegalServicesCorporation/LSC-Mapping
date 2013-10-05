var fs = require('fs'),
    hash = require('okay-hash'),
    glob = require('glob');

var gs = ['all.geojson'].map(function(f) {
    return JSON.parse(fs.readFileSync(f));
}).reduce(function(mem, g) {
    g.features.forEach(function(_) {
        fs.writeFileSync('areas/' + hash(_.properties.Description) + '.geojson',
            JSON.stringify(_));
    });
}, []);

var fs = require('fs'),
    hash = require('okay-hash'),
    glob = require('glob');

function bbox(f) {
    var ext = [Infinity, Infinity, -Infinity, -Infinity];

    function expand(pt) {
        if (pt[0] < ext[0]) ext[0] = pt[0];
        if (pt[1] < ext[1]) ext[1] = pt[1];
        if (pt[0] > ext[2]) ext[2] = pt[0];
        if (pt[1] > ext[3]) ext[3] = pt[1];
    }

    if (f.geometry.type == 'Polygon') {
        f.geometry.coordinates[0].forEach(expand);
    }

    if (f.geometry.type == 'MultiPolygon') {
        f.geometry.coordinates.forEach(function(coords) {
            coords.forEach(function(cds) {
                cds.forEach(expand);
            });
        });
    }

    return ext.concat(hash(f.properties.Description));
}
var gs = ['all.geojson'].map(function(f) {
    return JSON.parse(fs.readFileSync(f));
}).reduce(function(mem, g) {
    return mem.concat(g.features.reduce(function(m, _) {
        return m.concat([bbox(_)]);
    }, mem));
}, []);

fs.writeFileSync('index.json', JSON.stringify(gs));

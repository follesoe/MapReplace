var interceptors = (function () {
  var statkart = function(layer, input) {
    return "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + layer + "&zoom=" + input.z + "&x=" + input.x + "&y=" + input.y;
  }
  return {
    osm: {
      name: "OpenStreetMap",
      layers: {
        "osm-standard": {
          name: "Standard",
          replace: function (input) {
            return "http://tile.openstreetmap.org/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-cycle": {
          name: "Cycle Map",
          replace: function (input) {
            return "http://otile3.mqcdn.com/tiles/1.0.0/osm/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-transport": {
          name: "Transport Map",
          replace: function (input) {
            return "http://a.tile.openstreetmap.fr/hot/" + input.z + "/"+ input.x + "/" + input.y + ".png";
          }
        },
        "osm-mapquest": {
          name: "MapQuest Open",
          replace: function (input) {
            return "http://b.tile.openstreetmap.org/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-humanitarian": {
          name: "Humanitarian",
          replace: function (input) {
            return "http://c.tile.openstreetmap.fr/hot/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        }
      }
    },
    statkart: {
      name: "Statkart",
      layers: {
        "statkart-topo2": {
          name: "Statkart Topografisk",
          replace: function (input) {
            return statkart("topo2", input);
          }
        },
        "sjo_hovedkart2": {
          name: "Statkart Sjø Hovedkart",
          replace: function (input) {
            return statkart("sjo_hovedkart2", input);
          }
        },
        "kartdata2": {
          name: "Statkart Kartdata 2",
          replace: function (input) {
            return statkart("kartdata2", input);
          }
        },
        "topo2graatone": {
          name: "Statkart Gråtone",
          replace: function (input) {
            return statkart("topo2graatone", input);
          }
        },
        "toporaster2": {
          name: "Statkart Topografisk Raster",
          replace: function (input) {
            return statkart("toporaster2", input);
          }
        },
        "europa": {
          name: "Statkart Europa",
          replace: function (input) {
            return statkart("europa", input);
          }
        }
      }
    }
  };
})();
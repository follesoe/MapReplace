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
          name: "Cycle",
          replace: function (input) {
            return "http://otile3.mqcdn.com/tiles/1.0.0/osm/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-transport": {
          name: "Transport",
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
          name: "Land",
          replace: function (input) {
            return statkart("topo2", input);
          }
        },
        "sjo_hovedkart2": {
          name: "Sjøkart",
          replace: function (input) {
            return statkart("sjo_hovedkart2", input);
          }
        },
        "norges_grunnkart": {
          name: "Enkel",
          replace: function (input) {
            return statkart("norges_grunnkart", input);
          }
        },
        "topo2graatone": {
          name: "Gråtone",
          replace: function (input) {
            return statkart("topo2graatone", input);
          }
        },
        "europa": {
          name: "Europa",
          replace: function (input) {
            return statkart("europa", input);
          }
        },        
        "toporaster2": {
          name: "Plast-/Papirkark - Norge 1:50000",
          replace: function (input) {
            return statkart("toporaster2", input);
          }
        }
      }
    },
    finn: {
      name: "Finn.no",
      layers: {
        "finn-standard": {
          name: "Standard",
          replace: function (input) {
            return "http://maptiles2.finncdn.no/tileService/1.0.1/normap/" + input.z + "/" + input.x + "/" + input.y + ".png"
          }
        },
        "finn-flight": {
          name: "Flyfoto",
          replace: function (input) {
            return "http://maptiles3.finncdn.no/tileService/1.0.1/norortho/" + input.z + "/" + input.x + "/" + input.y + ".png"
          }
        },
        "finn-hybrid": {
          name: "Hybrid",
          replace: function (input) {
            return "http://maptiles2.finncdn.no/tileService/1.0.1/norhybrid/" + input.z + "/" + input.x + "/" + input.y + ".png"
          }
        }
      }
    }
  };
})();
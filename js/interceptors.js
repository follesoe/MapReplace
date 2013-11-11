var interceptors = (function () {
  var statkart = function(layer, input) {
    return "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + layer + "&zoom=" + input.z + "&x=" + input.x + "&y=" + input.y;
  }
  return {
    osm: {
      name: {
        en: "OpenStreetMap"
      },
      layers: {
        "osm-standard": {
          name: {
            en: "Standard"
          },
          replace: function (input) {
            return "http://tile.openstreetmap.org/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-cycle": {
          name: {
            en: "Cycle"
          },
          replace: function (input) {
            return "http://otile3.mqcdn.com/tiles/1.0.0/osm/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-sea": {
          name: {
            en: "Sea map"
          },
          replace: function (input) {
            return "http://osm1.wtnet.de/tiles/base/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-transport": {
          name: {
            en: "Transport"
          },
          replace: function (input) {
            return "http://a.tile.openstreetmap.fr/hot/" + input.z + "/"+ input.x + "/" + input.y + ".png";
          }
        },
        "osm-mapquest": {
          name: {
            en: "MapQuest Open"
          },
          replace: function (input) {
            return "http://b.tile.openstreetmap.org/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-humanitarian": {
          name: {
            en: "Humanitarian"
          },
          replace: function (input) {
            return "http://c.tile.openstreetmap.fr/hot/" + input.z + "/" + input.x + "/" + input.y + ".png";
          }
        },
        "osm-watercolor": {
          name: {
            en: "Watercolor"
          },
          replace: function (input) {
            return "http://tile.stamen.com/watercolor/" + input.z + "/" + input.x + "/" + input.y + ".jpg";
          }
        }
      }
    },
    statkart: {
      name: {
        en: "Norwegian Mapping Authority",
        no: "Kartverket"
      },
      layers: {
        "statkart-topo2": {
          name: {
            en: "Land"
          },
          replace: function (input) {
            return statkart("topo2", input);
          }
        },
        "sjo_hovedkart2": {
          name: {
            en: "Sea map",
            no: "Sjøkart"
          },
          replace: function (input) {
            return statkart("sjo_hovedkart2", input);
          }
        },
        "norges_grunnkart": {
          name: {
            en: "Simple",
            no: "Enkel"            
          },
          replace: function (input) {
            return statkart("norges_grunnkart", input);
          }
        },
        "topo2graatone": {
          name: {
            en: "Grayscale",
            no: "Gråtone"
          },
          replace: function (input) {
            return statkart("topo2graatone", input);
          }
        },
        "europa": {
          name: {
            en: "Europa"
          },
          replace: function (input) {
            return statkart("europa", input);
          }
        },        
        "toporaster2": {
          name: {
            en: "Norway 1:50000 Raster",
            no: "Papirkark - Norge 1:50000"
          },
          replace: function (input) {
            return statkart("toporaster2", input);
          }
        }
      }
    },
    finn: {
      name: {
        en: "Finn.no"
      },
      layers: {
        "finn-standard": {
          name: {
            en: "Standard"
          },
          replace: function (input) {
            return "http://maptiles2.finncdn.no/tileService/1.0.1/normap/" + input.z + "/" + input.x + "/" + input.y + ".png"
          }
        },
        "finn-flight": {
          name: {
            en: "Arial photo",
            no: "Flyfoto"
          },
          replace: function (input) {
            return "http://maptiles3.finncdn.no/tileService/1.0.1/norortho/" + input.z + "/" + input.x + "/" + input.y + ".png"
          }
        },
        "finn-hybrid": {
          name: {
            en: "Hybrid"
          },
          replace: function (input) {
            return "http://maptiles2.finncdn.no/tileService/1.0.1/norhybrid/" + input.z + "/" + input.x + "/" + input.y + ".png"
          }
        }
      }
    }
  };
})();
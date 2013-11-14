var interceptors = (function () {
  var statkart = function(layer, input) {
    return "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + layer + "&zoom=" + input.z + "&x=" + input.x + "&y=" + input.y;
  }
  return {
    osm: {
      name: {
        en: "OpenStreetMap"
      },
      copyright: {
        en: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
        nb: 'Kartdata levert av <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">'
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
        nb: "Kartverket"
      },
      copyright: {
        en: 'Tiles Courtesy of <a href="http://www.statkart.no/kart/gratis-kartdata/lisens/" target="_blank">Norwegian Mapping Authorities</a>',
        nb: 'Kartdata levert av <a href="http://www.statkart.no/kart/gratis-kartdata/lisens/" target="_blank">Statkart</a>'
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
            nb: "Sjøkart"
          },
          replace: function (input) {
            return statkart("sjo_hovedkart2", input);
          }
        },
        "norges_grunnkart": {
          name: {
            en: "Simple",
            nb: "Enkel"
          },
          replace: function (input) {
            return statkart("norges_grunnkart", input);
          }
        },
        "topo2graatone": {
          name: {
            en: "Grayscale",
            nb: "Gråtone"
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
            nb: "Papirkark - Norge 1:50000"
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
      copyright: {
        en: 'Tiles Courtesy of <a href="http://kart.finn.no/" target="_blank">Finn.no</a>.',
        nb: 'Kartdata levert av <a href="http://kart.finn.no/" target="_blank">Finn.no</a>.'
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
            nb: "Flyfoto"
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
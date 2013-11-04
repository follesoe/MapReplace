var interceptors = (function () {
  var statkart = function(layer, input) {
    return "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + layer + "&zoom=" + input.z + "&x=" + input.x + "&y=" + input.y;
  }

  return {
    statkart: {
      name: "Statkart",
      layers: {
        "statkart-topo2": {
          name: "Statkart Topografisk",
          replace: function(input) {
            return statkart("topo2", input);
          }
        },
        "sjo_hovedkart2": {
          name: "Statkart Sjø Hovedkart",
          replace: function(input) {
            return statkart("sjo_hovedkart2", input);
          }
        },
        "kartdata2": {
          name: "Statkart Kartdata 2",
          replace: function(input) {
            return statkart("kartdata2", input);
          }
        },
        "topo2graatone": {
          name: "Statkart Gråtone",
          replace: function(input) {
            return statkart("topo2graatone", input);
          }
        },
        "toporaster2": {
          name: "Statkart Topografisk Raster",
          replace: function(input) {
            return statkart("toporaster2", input);
          }
        },
        "europa": {
          name: "Statkart Europa",
          replace: function(input) {
            return statkart("europa", input);
          }
        }
      }
    }
  };
})();
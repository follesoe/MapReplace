var interceptors = (function () {
  var statkart = function(layer, x, y, z) {
    return "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + layer + "&zoom=" + z + "&x=" + x + "&y=" + y;
  }

  return {
    statkart: {
      name: "Statkart",
      layers: {
        "statkart-topo2": {
          name: "Statkart Topografisk",
          replace: function(input) {
            return statkart("topo2", input.x, input.y, input.z);
          }
        },
        "sjo_hovedkart2": {
          name: "Statkart Sjø Hovedkart",
          replace: function(input) {
            return statkart("sjo_hovedkart2", input.x, input.y, input.z);
          }
        },
        "kartdata2": {
          name: "Statkart Kartdata 2",
          replace: function(input) {
            return statkart("kartdata2", input.x, input.y, input.z);
          }
        },
        "topo2graatone": {
          name: "Statkart Gråtone",
          replace: function(input) {
            return statkart("topo2graatone", input.x, input.y, input.z);
          }
        },
        "toporaster2": {
          name: "Statkart Topografisk Raster",
          replace: function(input) {
            return statkart("toporaster2", input.x, input.y, input.z);
          }
        },
        "europa": {
          name: "Statkart Europa",
          replace: function(input) {
            return statkart("europa", input.x, input.y, input.z);
          }
        }
      }
    }
  };
})();

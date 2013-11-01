var statkart = function(layer, x, y, z) {
  return "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + layer + "&zoom=" + z + "&x=" + x + "&y=" + y;
}

var interceptors = {
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

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.type === 'image') {
      var regex = /lyrs=([^&]+)(?:.*)&x=([^&]*)(?:.*)&y=([^&]*)(?:.*)&z=([^&]*)/;
      var matches = regex.exec(details.url);
      if (matches && matches.length > 1) {
        var input = {
          x: matches[2],
          y: matches[3],
          z: matches[4]
        };

        var res = interceptors["toporaster2"].replace(input);
        if (res) { 
          return {
            redirectUrl: res
          };
        }
      }
    }
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
);
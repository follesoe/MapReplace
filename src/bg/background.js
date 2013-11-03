;(function (chrome, interceptors) {

  var settings = {
    'maptype': false,
    'layertype': false,
  };

  chrome.storage.sync.get("mapSettings", function (storedSettings) {
    settings.maptype = storedSettings.mapSettings.maptype;
    settings.layertype = storedSettings.mapSettings.layertype;
  });

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'sync' && changes.mapSettings) {
      settings.maptype = changes.mapSettings.newValue.maptype;
      settings.layertype = changes.mapSettings.newValue.layertype;
    }
  });

  var getMapInputs = function (url) {
    var matches = /lyrs=([^&]+)(?:.*)&x=([^&]*)(?:.*)&y=([^&]*)(?:.*)&z=([^&]*)/.exec(url);
    if (!matches || matches.length < 4) {
      return void 0;
    }

    return {
      x: matches[2],
      y: matches[3],
      z: matches[4]
    };
  };

  var getCurrentSettings = function () {
    return settings;
  }

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.type !== 'image') {
        return void 0;
      }

      var input = getMapInputs(details.url),
          maptype = settings['maptype'],
          layertype = settings['layertype'];

      if (!input) {
        return void 0;
      }

      if (!interceptors[maptype] || !interceptors[maptype].layers[layertype]) {
        return void 0;
      }

      var map = interceptors[maptype].layers[layertype],
          res = map.replace(input);

      if (res) {
        return {
          redirectUrl: res
        };
      }
    },
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]
  );
}(window.chrome, window.interceptors));
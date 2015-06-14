;(function (chrome, interceptors) {

  var settings = {
    'maptype': false,
    'layertype': false,
    'enabled': false
  };

  var setNewSettings = function (storedSettings) {
    settings.maptype = storedSettings.maptype;
    settings.layertype = storedSettings.layertype;
    settings.enabled = storedSettings.enabled;
  };

  chrome.storage.sync.get("mapSettings", function (storedSettings) {
    setNewSettings(storedSettings.mapSettings);
  });

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === 'sync' && changes.mapSettings) {
      setNewSettings(changes.mapSettings.newValue);
    }
  });

  var getMapInputs = function (url) {
    var matches = /lyrs=([^&]+)(?:.*)&x=([^&]*)(?:.*)&y=([^&]*)(?:.*)&z=([^&]*)/.exec(url);
    if (matches && matches.length >= 5) {
      return {
        x: matches[2],
        y: matches[3],
        z: matches[4]
      };
    }

    matches = /pb=[^&]*!1i(\d+)!2i(\d+)!3i(\d+)/.exec(url);
    if (matches) {
      return {
        x: matches[2],
        y: matches[3],
        z: matches[1]
      };
    }

    return void 0;
  };

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.type !== 'image' || !settings.enabled) {
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
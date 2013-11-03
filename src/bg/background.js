;(function (chrome, interceptors, storage, undefined) {

  var settings = {};
  storage.read(function (fromStorage) {
    settings = fromStorage;
  });

  storage.onChange(function (newSettings) {
    settings = newSettings;
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

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.type !== 'image') {
        return void 0;
      }
      var input = getMapInputs(details.url),
          mapType = settings['source'],
          layer = settings['layer'];

      if (!input) {
        return void 0;
      }

      if (!interceptors[mapType] || !interceptors[mapType].layers[layer]) {
        return void 0;
      }

      var map = interceptors[mapType].layers[layer],
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
}(window.chrome, window.interceptors, window.storage));
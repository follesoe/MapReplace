chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.type === 'image') {
      var regex = /lyrs=([^&]+)(?:.*)&x=([^&]*)(?:.*)&y=([^&]*)(?:.*)&z=([^&]*)/;
      var matches = regex.exec(details.url);
      if (matches && matches.length > 1) {
        var layer = matches[1];
        var x = matches[2];
        var y = matches[3];
        var z = matches[4];
        var url = "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom=" + z + "&x=" + x + "&y=" + y;
        return {
          redirectUrl: url
        };
      }
    }
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
);
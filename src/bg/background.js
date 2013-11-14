;(function (chrome, interceptors) {

  var settings = {
    'maptype': false,
    'layertype': false,
    'enabled': false,
    'whitelist': ["*"]
  };

  var openTabDomains = {};

  var setNewSettings = function (storedSettings) {
    settings.maptype = storedSettings.maptype;
    settings.layertype = storedSettings.layertype;
    settings.enabled = storedSettings.enabled;
    settings.whitelist = storedSettings.whitelist;
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
    if (!matches || matches.length < 4) {
      return void 0;
    }

    return {
      x: matches[2],
      y: matches[3],
      z: matches[4]
    };
  };

  var parseDomain = function (url) {
    var urlparser = document.createElement('a');
    urlparser.href = url;
    return urlparser.hostname;
  };

  // Check if domain is whitelisted
  var isDomainWhiteListed = function (domain) {
    return (settings.whitelist.some(function (item) {

      if (item.length < 1)
        return false;

      // Simulate a glob like syntax using regexp (* => [^ ]* and . => \.)
      // Would probably be better to add a real glob library here
      var regexpression = item.replace(/\./g, '\.').replace(/\*/g, "[^ ]*");

      whitelistTest = new RegExp(regexpression);
      return whitelistTest.test(domain);
    }));
  };

  // Cache tabid -> domain for all tabs on extension load.
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      if ((typeof(tab.url) !== 'undefined') && (typeof(tab.id) !== 'undefined'))
        openTabDomains[tab.id] = parseDomain(tab.url);
    });
  });

  // Keep a cache of tabid -> domain mappings in openTabDomains
  chrome.tabs.onUpdated.addListener(
    function (tabid, changeinfo, tab) {
      if (typeof(tab.url) === 'undefined')
        return;
      openTabDomains[tabid] = parseDomain(tab.url);
    });

  // Remove tabs from domain cache on close
  chrome.tabs.onRemoved.addListener(
    function (tabid, removeInfo) {
      delete openTabDomains[tabid];
    });

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

      // Check whitelist
      if ((typeof(details.tabId) !== 'undefined') &&
        (typeof(openTabDomains[details.tabId] !== 'undefined')) &&
        (!isDomainWhiteListed(openTabDomains[details.tabId])))
      {
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

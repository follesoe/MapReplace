var storage = (function (chrome) {
    return {
      create: function ($item) {
        return {
          source: $item.parents(".top").find("a").attr("data-interceptor"),
          layer: $item.attr("data-interceptor")
        };
      },

      save: function (settings, cb) {
        var store = {
          'settings': settings
        };
        return chrome.storage.local.set(store, cb);
      },

      read: function (cb) {
        return chrome.storage.local.get('settings', function (data) {
          if (data.settings) {
            cb(data.settings);
          }
        });
      },

      onChange: function (cb) {
        chrome.storage.onChanged.addListener(function(changes, namespace) {
          if (namespace === "local" && changes.settings) {
            cb(changes.settings.newValue);
          }
        });
      }
    }
}(window.chrome));
;(function (chrome, interceptors) {
  var settings = {
    enabled: false
  };

  var populate = function () {
    var $body = $("body");
    $body.append("<h1>Enable Map Replace</h1>")
         .append("<label><input type='checkbox' id='isEnabled' />Enable Map Replace for all pages</label>");

    _.each(interceptors, function (interceptor, interceptorId) {
      $body.append("<h2>" + interceptor.name + "</h2>");

      _.each(interceptor.layers, function (layer, layerId) {
        var input = "<label><input type='radio' data-maptype='" + interceptorId + "' data-layertype='" + layerId + "' name='layerid' />" + layer.name + "</label>";
        $body.append(input);
      });
    });
  };

  var saveSettings = function() {
    chrome.storage.sync.set({
      "mapSettings": settings
    });
  };

  var enableDisableSelection = function() {
    $("input[type='radio']").attr("disabled", function () {
      return settings.enabled ? null : "disabled";
    });
  };

  populate();
  enableDisableSelection();

  $("input[type='radio']").click(function (e) {
    var newSettings = $(e.currentTarget).data();
    settings.maptype = newSettings.maptype;
    settings.layertype = newSettings.layertype;
    saveSettings();
  });

  $("input[type='checkbox']").click(function (e) {
    settings.enabled = $(e.currentTarget).is(":checked");
    enableDisableSelection();
    saveSettings();
  });

  chrome.storage.sync.get("mapSettings", function (storedSettings) {
    var mapSettings = storedSettings.mapSettings;
    settings.maptype = mapSettings.maptype;
    settings.layertype = mapSettings.layertype;
    settings.enabled = mapSettings.enabled;

    var checkedAttr = settings.enabled ? "checked" : null;
    $("input[type='checkbox']").attr("checked", checkedAttr);
    $("input[data-layertype='" + mapSettings.layertype + "']").attr("checked", "checked");
  });
}(window.chrome, window.interceptors));
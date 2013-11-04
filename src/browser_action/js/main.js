;(function (chrome, interceptors) {
  var settings = {
    enabled: false
  };

  var populate = function () {

    $("body").append("<h1>Enable Map Replace</h1>")
    $("body").append("<label><input type='checkbox' id='isEnabled' />Enable Map Replace for all pages</label>");

    _.each(interceptors, function (interceptor, interceptorId) {      
      var h1 = "<h1>" + interceptor.name + "</h1>";
      $("body").append(h1);

      _.each(interceptor.layers, function (layer, layerId) {
        console.log(layer);
        var input = "<label><input type='radio' data-maptype='" + interceptorId + "' data-layertype='" + layerId + "' name='layerid' />" + layer.name + "</label></br>";
        $("body").append(input);
      });
    });    
  };

  var saveSettings = function() {
    chrome.storage.sync.set({
      "mapSettings": settings
    });
  };

  var enableDisableSelection = function() {
    var disabledAttr = settings.enabled ? null : "disabled";
    $("input[type='radio']").attr("disabled", disabledAttr);
  }

  populate();

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
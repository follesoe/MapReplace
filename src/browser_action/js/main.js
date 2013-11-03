;(function (chrome, interceptors) {
  var populate = function () {
    _.each(interceptors, function (interceptor, interceptorId) {
      var h1 = "<h1>" + interceptor.name + "</h1>";
      $("body").append(h1);

      _.each(interceptor.layers, function (layer, layerId) {
        var li = "<input type='radio' data-maptype='" + interceptorId + "' data-layertype='" + layerId + "' name='maplayer'>" + layer.name + "</input><br/>";
        $("body").append(li);
      });
    });    
  };

  populate();

  $("input").click(function (e) {
    var settings = $(e.currentTarget).data();
    chrome.storage.sync.set({
      "mapSettings": settings
    });
  });

  chrome.storage.sync.get("mapSettings", function (settings) {
    var mapSettings = settings.mapSettings;
    $("input[data-layertype='" + mapSettings.layertype + "']").attr("checked", "checked");
  });
}(window.chrome, window.interceptors));
;(function (chrome, interceptors) {
  var settings = {
    enabled: false
  };

  var populate = function () {
    var $body = $("#contents"),
        locale = chrome.i18n.getMessage("@@ui_locale").substr(0, 2);

    $body.append("<h1>" + chrome.i18n.getMessage("settingsTitle") + "</h1>")
         .append("<label><input type='checkbox' id='isEnabled' />" + chrome.i18n.getMessage("settingsEnableDescription") + "</label>");

    $.each(interceptors, function (interceptorId, interceptor) {
      $body.append("<h2>" + (interceptor.name[locale] || interceptor.name["en"]) + "</h2>");
      $body.append("<p class='copyright'>" + (interceptor.copyright[locale] || interceptor.copyright["en"]) + "</p>");

      $.each(interceptor.layers, function (layerId, layer) {
        var layerName = layer.name[locale] || layer.name["en"],
            input = "<label><input type='radio' data-maptype='" + interceptorId + "' data-layertype='" + layerId + "' name='layerid' />" + layerName + "</label>";
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

  var showRefreshNotice = function () {
    if ($(".notice").length) {
      return;
    }
    $("h1").before($("<p />", {
      "class": "notice",
    }).text(chrome.i18n.getMessage("refreshNotice")));
  };

  populate();

  $("input[type='radio']").click(function (e) {
    showRefreshNotice();
    var newSettings = $(e.currentTarget).data();
    settings.maptype = newSettings.maptype;
    settings.layertype = newSettings.layertype;
    saveSettings();
  });

  $("input[type='checkbox']").click(function (e) {
    showRefreshNotice();
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
    enableDisableSelection();
  });
}(window.chrome, window.interceptors));
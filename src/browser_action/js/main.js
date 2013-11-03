;(function (chrome, interceptors, storage, undefined) {
  var $ul = $("#interceptors");

  var template = (function () {
    var tmpl = "<li {{extra}}><a href='#' data-interceptor='{{key}}'>{{name}}</a>";
    return function (name, key, extra) {
      extra = extra || '';
      return tmpl
                .replace(/\{\{name\}\}/g, name)
                .replace(/\{\{key\}\}/g, key)
                .replace(/\{\{extra\}\}/g, extra)
    };
  }());

  var populate = function (settings) {
    var data = _.reduce(interceptors, function(str, interceptor, i) {
      var childIsSelected = false;
      var children = _.reduce(interceptor.layers, function(acc, layer, k) {
                      var selected = settings.source === i && settings.layer === k;
                      if (selected) {
                        childIsSelected = true;
                      }

                      return acc + template(layer.name, k, selected ? 'class="active"' : '') + "</li>";
                    }, "<ul>") + "</ul></li>";

      var extra = 'class="top' + (childIsSelected ? " open" : "") + '"';
      return str + template(interceptor.name, i, extra)
                 + children;
    }, "");

    $ul.html(data);
  };

  var mapLayerClicked = function (e) {
    e.preventDefault();

    var $el = $(e.currentTarget),
        $li = $el.parent();

    if($li.hasClass("top")) {
      $li.toggleClass("open");
      return;
    }

    var settings = storage.create($el);
    storage.save(settings, function (msg) {
      $(".active").removeClass("active");
      $li.addClass("active");
    });
  };

  storage.read(function (settings) {
    console.log("settings", settings);
    populate(settings);
  });
  $ul.on("click", "a", mapLayerClicked);

}(window.chrome, window.interceptors, window.storage));
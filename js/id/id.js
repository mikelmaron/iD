window.iD = function () {
    var context = {},
        history = iD.History(),
        connection = iD.Connection().version(iD.version),
        controller = iD.Controller(),
        container,
        ui = iD.ui(context),
        map = iD.Map().connection(connection).history(history);

    /* Straight accessors. Avoid using these if you can. */
    context.ui         = function () { return ui; };
    context.connection = function () { return connection; };
    context.history    = function () { return history; };
    context.controller = function () { return controller; };
    context.map        = function () { return map; };

    /* History delegation. */
    context.graph   = history.graph;
    context.perform = history.perform;
    context.replace = history.replace;
    context.pop     = history.pop;
    context.undo    = history.undo;
    context.redo    = history.undo;
    context.changes = history.changes;

    context.entity   = function (id) { return history.graph().entity(id); };
    context.geometry = function (id) { return context.entity(id).geometry(history.graph()); };

    context.enter = controller.enter;
    context.mode = function () { return controller.mode; };

    context.install   = function (behavior) { context.surface().call(behavior); };
    context.uninstall = function (behavior) { context.surface().call(behavior.off); };

    context.background = function () { return map.background; };
    context.surface    = function () { return map.surface; };
    context.projection = map.projection;
    context.tail       = map.tail;

    context.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        return context;
    };

    context.background()
        .source(iD.BackgroundSource.Bing);

    return context;
};

iD.version = '0.0.0-alpha1';

iD.supported = function() {
    if (navigator.appName !== 'Microsoft Internet Explorer') {
        return true;
    } else {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
        if (re.exec(ua) !== null) {
            rv = parseFloat( RegExp.$1 );
        }
        if (rv && rv < 9) return false;
        else return true;
    }
};

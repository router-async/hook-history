var storageHistory = sessionStorage.getItem('session-history');
var scrollHistory = [];

var sessionHistory = {
    length: 0,
    routes: []
};

if (storageHistory) {
    try {
        sessionHistory = JSON.parse(storageHistory);
    } catch (e) {
        console.warn('Session history parse failed:', e);
    }
}

module.exports = function (_ref) {
    var history = _ref.history;
    return {
        start: function () {
            if (history.action) {
                var route = '' + location.pathname + location.search;
                var lastRoute = sessionHistory.routes[sessionHistory.length - 1];

                if (history.action === 'PUSH') {
                    scrollHistory.push(window.scrollY);
                }

                if (route !== lastRoute) {
                    sessionHistory.length++;
                    sessionHistory.routes.push(route);
                    sessionStorage.setItem('session-history', JSON.stringify(sessionHistory));
                }
            }
        },
        render: function () {
            if (history.internalBack) {
                var position = scrollHistory[scrollHistory.length - ++history.internalBack];

                // temp stuff, waiting for render hooks fix
                setTimeout(function () {
                    if (typeof position !== 'undefined') {
                        window.scrollTo(0, position);
                    }
                }, 100);
                history.internalBack = null;
            }
        }
    };
};

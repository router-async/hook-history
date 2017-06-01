var storageHistory = sessionStorage.getItem('session-history');
var sessionHistory = {
    length: 0,
    routes: []
};

if (storageHistory) {
    sessionHistory = JSON.parse(storageHistory);
}

module.exports = function (_ref) {
    var history = _ref.history;
    return {
        start: function () {
            if (history.action) {
                var route = `${location.pathname}${location.search}`;
                var lastRoute = sessionHistory.routes[sessionHistory.length - 1];

                if (route !== lastRoute) {
                    sessionHistory.length++;
                    sessionHistory.routes.push(route);
                    sessionStorage.setItem('session-history', JSON.stringify(sessionHistory));
                }
            }
        }
    };
};

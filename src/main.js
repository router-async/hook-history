const storageHistory = sessionStorage.getItem('session-history');
let sessionHistory = {
    length: 0,
    routes: []
};

if(storageHistory) {
    sessionHistory = JSON.parse(storageHistory)
}

module.exports = ({ history }) => ({
    start: () => {
        if(history.action) {
            const route = `${location.pathname}${location.search}`;
            const lastRoute = sessionHistory.routes[sessionHistory.length - 1];

            if(route !== lastRoute) {
                sessionHistory.length++;
                sessionHistory.routes.push(route);
                sessionStorage.setItem('session-history', JSON.stringify(sessionHistory));
            }
        }
    }
});

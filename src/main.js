const storageHistory = sessionStorage.getItem('session-history');
const scrollHistory = [];

let sessionHistory = {
    length: 0,
    routes: []
};

if(storageHistory) {
    try {
        sessionHistory = JSON.parse(storageHistory);
    } catch(e) {
        console.warn('Session history parse failed:', e);
    }
}

module.exports = ({ history }) => ({
    start: () => {
        if(history.action) {
            const route = `${location.pathname}${location.search}`;
            const lastRoute = sessionHistory.routes[sessionHistory.length - 1];

            if(history.action === 'PUSH') {
                scrollHistory.push(window.scrollY);
            }

            if(route !== lastRoute) {
                sessionHistory.length++;
                sessionHistory.routes.push(route);
                sessionStorage.setItem('session-history', JSON.stringify(sessionHistory));
            }
        }
    },
    render: () => {
        if(history.internalBack) {
            const position = scrollHistory[scrollHistory.length - ++history.internalBack];

            // temp stuff, waiting for render hooks fix
            setTimeout(() => {
                if(typeof position !== 'undefined') { window.scrollTo(0, position); }
            }, 100);
            history.internalBack = null;
        }
    }
});

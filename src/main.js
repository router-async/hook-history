const storageHistory = sessionStorage.getItem('session-history');

let session = [];

if(storageHistory) {
    try {
        const parsed = JSON.parse(storageHistory);
        session = Array.isArray(parsed) ? parsed : [];
    } catch(e) {
        console.warn('Session history parse failed:', e);
    }
}

module.exports = ({ history }) => ({
    start: () => {
        if(history.action) {
            const next = location.pathname + location.search;
            const prev = session[session.length - 1];

            switch(history.action) {
                case 'PUSH':
                    if (next !== prev) {
                        session.push(next);
                        sessionStorage.setItem('session-history', JSON.stringify(session));
                    }
                    break;
                case 'POP':
                    session.pop();
                    sessionStorage.setItem('session-history', JSON.stringify(session));
                    break;
            }
        }
    }
});

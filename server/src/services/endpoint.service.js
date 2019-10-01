const WebSocket = require('ws');

module.exports = function initializeEndpoints(app, webSocketServer) {
    ringEndpoint(app, webSocketServer);
    ringAllEndpoint(app, webSocketServer);
}

function ringEndpoint(app, webSocketServer) {
    app.post('/ring/:gongId', (req, res) => {
        const gongId = JSON.parse(req.params.gongId);

        webSocketServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client.id === gongId) {
                client.send('ring');
            }
        });
        res.sendStatus(200);
    });
}

function ringAllEndpoint(app, webSocketServer) {
    app.post('/ringAll', (req, res) => {
        webSocketServer.clients.forEach(client => {
            if (client.protocol !== 'webServer' && client.readyState === WebSocket.OPEN) {
                client.send('ring');
            }
        });
        res.sendStatus(200);
    });
}
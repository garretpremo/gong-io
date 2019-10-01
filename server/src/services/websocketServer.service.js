const WebSocket = require('ws');

module.exports = initializeWebSocketServer;

function initializeWebSocketServer() {
    const wss = new WebSocket.Server({ port: 8085 });
    let webServerClients = [];
    let pythonClients = [];
    let uniqueClientId = 1;

    wss.on('connection', ws => {
        ws.id = uniqueClientId++;

        if (ws.protocol === 'webServer') {
            webServerClients.push(ws);
        } else {
            pythonClients.push(ws);
        }

        sendClientsToWebServers(wss);
    });

    return wss;

    function getClients(wss) {
        return pythonClients.map(client => {
            return {
                id: client.id,
                name: `gong ${client.id}`
            }
        });
    }

    function sendClientsToWebServers(wss) {
        const clients = getClients(wss);
        
        if (clients.length !== 0) {
            webServerClients.forEach(webServerClient => {
                webServerClient.send(JSON.stringify(clients));
            });
        }
    }
}
export default function setUpGongWebsocket(onMessage) {
    const ws = new WebSocket('ws://localhost:8085', 'webServer');

    ws.addEventListener('message', onMessage);
}
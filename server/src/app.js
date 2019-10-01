console.log('server started');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const initializeWebSocketServer = require('./services/websocketServer.service');
const initializeEndpoints = require('./services/endpoint.service');


const app = express();

// endpoint logging
app.use(morgan('combined')); 

app.use(bodyParser.json());
app.use(cors());

// set up web socket server
const webSocketServer = initializeWebSocketServer();

// set up endpoints
initializeEndpoints(app, webSocketServer);

app.listen(process.env.PORT || 8081);
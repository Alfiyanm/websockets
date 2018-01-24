"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
// HTTP Server
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client/simple-websocket-client.html'));
});
var httpServer = app.listen(8000, "localhost", function () {
    var port = httpServer.address().port;
    console.log('HTTP Server is listening on %s', port);
});
// WebSocket Server
var wsServer = new ws_1.Server({ port: 8085 });
console.log('WebSocket server is listening on port 8085');
wsServer.on('connection', function (websocket) {
    websocket.send('This message was pushed by the WebSocket server');
    websocket.on('message', function (message) {
        console.log("Server recieved : %s", message);
        var todaysDate = new Date();
        websocket.send('date pushed by server: ' + todaysDate.toString());
    });
});
// Broadcasting to all clients
/*
wsServer.on('connection',
    websocket => wsServer.clients
        .forEach(
            client =>client.send('This message was pushed by the WebSocket server')));*/

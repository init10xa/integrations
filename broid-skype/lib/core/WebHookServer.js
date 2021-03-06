"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@broid/utils");
const Promise = require("bluebird");
const bodyParser = require("body-parser");
const express = require("express");
class WebHookServer {
    constructor(router, options, logLevel) {
        this.host = options.host;
        this.port = options.port;
        this.logger = new utils_1.Logger('webhookServer', logLevel || 'info');
        this.express = this.setupExpress(router);
    }
    listen() {
        this.httpServer = this.express.listen(this.port, this.host, () => {
            this.logger.info(`Server listening on port ${this.host}:${this.port}...`);
        });
    }
    close() {
        return Promise.fromCallback((cb) => this.httpServer.close(cb));
    }
    setupExpress(router) {
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(router);
    }
}
exports.WebHookServer = WebHookServer;

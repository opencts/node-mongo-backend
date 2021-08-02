import log from "../console/log";

export default class WSResponse {
    /**
     * @param {string} route Current route
     * @param {string} method POST or DELETE
     */
    constructor(route, method) {
        this.route = route;
        this.method = method;
    }

    /**
     * Provide the appropriate response object after a request
     * @param {object} socket The client socket
     * @param {number} status Response status code
     * @param {string} message Response message text
     * @param {object} data Response content object
     */
    json(socket, status = 200, data = null, message = 'ok') {

        if (status > 300) {
            log.error(`[WS:${this.method.toUpperCase()}] /${this.route} : ${message}`, status);
        } else {
            log.info(`[WS:${this.method.toUpperCase()}] /${this.route} : Data sent with success`, status);
        }

        return socket.send(JSON.stringify({
            status,
            message,
            data
        }));
    }
}

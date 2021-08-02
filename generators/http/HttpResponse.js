import log from "../console/log";

export default class HttpResponse {
    constructor(res, route, method = 'GET') {
        this.response = res;
        this.route = route;
        this.method = method;
    }

    /**
     * Provide the appropriate response object after a request
     * @param {number} status Response status code
     * @param {string} message Response message text
     * @param {object} data Response content object
     */
    json(status = 200, data = null, message = 'ok') {

        if (status > 300) {
            log.error(`[${this.method.toUpperCase()}] /${this.route} : ${message}`, status);
        } else {
            log.info(`[${this.method.toUpperCase()}] /${this.route} : Data sent with success`, status);
        }

        return this.response.status(status).json({
            status,
            message,
            data
        });
    }
}

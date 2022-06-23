import axios, {AxiosInstance} from 'axios';
import {isEmpty, assign, merge} from 'lodash';
import {API_VERSION, API_DOMAIN} from "../constants";

const singletonEnforcer = Symbol();
const snakeCase = require('snakecase-keys');

class HttpClient {
    axiosClient: AxiosInstance;
    static axiosClientInstance: HttpClient;

    constructor(enforcer: any) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot initialize Axios client single instance');
        }

        this.axiosClient = axios.create({
            baseURL: API_VERSION !== '' ? API_DOMAIN + '/' + API_VERSION : API_DOMAIN,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 30 * 60,
        });

        this.axiosClient.interceptors.request.use(
            (request: any) => {
                return request;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );

        this.axiosClient.interceptors.response.use(
            (response: any) => {
                return response;
            },
            (error: any) => {
                let dataErrors = error.response.data;
                error.response.errorsObject = {};
                dataErrors.errorsObject = {};

                return Promise.reject(error.response);
            }
        );
    }

    static get instance() {
        if (!this.axiosClientInstance) {
            this.axiosClientInstance = new HttpClient(singletonEnforcer);
        }

        return this.axiosClientInstance;
    }

    get(resource: string, slug = '', config: any = {}) {
        const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;

        return this.axiosClient.get(requestURL, {
            data: null,
            ...merge({headers: this.axiosClient.defaults.headers}, config)
        })
    }

    update(resource: string, data: object, config: any = {}) {
        return this.axiosClient.put(
            `${resource}`,
            data,
            assign(config, this.axiosClient.defaults.headers)
        )
    }

    post(resource: string, data: object, config: any = {}) {
        return this.axiosClient.post(
            `${resource}`,
            data,
            assign(config, this.axiosClient.defaults.headers)
        )
    }

    put(resource: string, data: object, config: any = {}) {
        return this.axiosClient.put(
            `${resource}`,
            data,
            assign(config, this.axiosClient.defaults.headers)
        )
    }

    patch(resource: string, data: object, config: any = {}) {
        return this.axiosClient.patch(
            `${resource}`,
            data,
            assign(config, this.axiosClient.defaults.headers)
        )
    }

    delete(resource: string, data: object, config: any = {}) {
        return this.axiosClient.delete(`${resource}`, {
            params: data,
            ...assign(config, this.axiosClient.defaults.headers)
        })
    }
}

export default HttpClient.instance;

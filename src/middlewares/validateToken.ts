import axios from 'axios';
import { authResponseInterface } from "../interfaces/authResponseInterface";
import { API } from "../config/constants";
import CommonRestAPI from "../util/commonRestAPI";
import { apiParamsInterface } from "../interfaces/apiParamInterface";


class AccessTokenMiddleware {
    token = ""
    callAPI = new CommonRestAPI().callAPI;
    constructor(_token: string) {
        this.token = _token;
    }

    async getAccessToken() { // Generating and saving the token in an variable for reuse
        try {
            const tokenResponse: authResponseInterface = await this.generateAccessToken();
            this.token = tokenResponse.data.token;
        } catch (error) {
            console.log('error...', error);
        }
        return this.token;
    }

    async generateAccessToken() {  // Generating token by calling auth api with valid credentials
        const credentials = {
            email: process.env.AUTH_EMAIL || "",
            password: process.env.AUTH_PASSWORD || "",
        }
        const { endpoint, method, header } = API.AuthToken;
        const paramaters: apiParamsInterface = {
          endPoints: endpoint,
          params: credentials,
          method: method,
          token: "",
          header: header,
        };

        const result: authResponseInterface = await this.callAPI(paramaters);
        return result;
    }

}

export default AccessTokenMiddleware
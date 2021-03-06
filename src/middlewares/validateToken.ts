import { authResponseInterface } from "../interfaces/authResponseInterface";  // importing authentication response interface
import { API } from "../config/constants";  // importing self configured constants 
import CommonRestAPI from "../util/commonRestAPI";  // importing common rest api for axios call of specific endpoints
import { apiParamsInterface } from "../interfaces/apiParamInterface";  // importing api params interface


class AccessTokenMiddleware {
    token = ""
    callAPI = new CommonRestAPI().callAPI;
    constructor(_token: string) {
        this.token = _token;
    }

    async getAccessToken() { // Generating and saving the token in an variable for reuse
        try {
            const tokenResponse: authResponseInterface = await this.generateAccessToken();  // calling generate token method
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

        const result: authResponseInterface = await this.callAPI(paramaters);  // calling auth token api and returing the result data
        return result;
    }

}

export default AccessTokenMiddleware
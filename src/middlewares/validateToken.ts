import axios from 'axios';
import { authResponseInterface } from "../interfaces/authResponseInterface";


class AccessTokenMiddleware {
    token = ""

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
        const body = {
            email: process.env.AUTH_EMAIL,
            password: process.env.AUTH_PASSWORD
        }
        const url = process.env.API_BASE_URL + `/auth`;
        const result = await axios.post(url, body);
        return result;
    }

}

export default AccessTokenMiddleware
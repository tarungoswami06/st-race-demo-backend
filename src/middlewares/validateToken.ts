import axios from 'axios';

class AccessTokenMiddleware {
    token = ""

    constructor(_token: string) {
        this.token = _token;
    }

    async getAccessToken() { // Generating and saving the token in an variable for reuse
        try {
            let tokenResponse: any;
            tokenResponse = await this.generateAccessToken();
            this.token = tokenResponse.data.token;
        } catch (error: any) {
            console.log('error...', error);
        }
        return this.token;
    }

    async generateAccessToken() {  // Generating token by calling auth api with valid credentials
        let body = {
            email: process.env.AUTH_EMAIL,
            password: process.env.AUTH_PASSWORD
        }
        let url = process.env.API_BASE_URL + `/auth`;
        let result = await axios.post(url, body);
        return result;
    }

}

export default AccessTokenMiddleware
import accessTokenMiddleware from "../middlewares/validateToken"; // Middleware for generating and validating access token
import trotService from "../services/trotService"; // importing Service for doing api's operations


class RaceService {
  private accessToken: accessTokenMiddleware;

  constructor() {
    this.accessToken = new accessTokenMiddleware("");
  }

  // Initiate simulator once app starts by authorizing user
  async initiateSimulator() {
    try {
      this.accessToken = new accessTokenMiddleware("");
      var accessToken = await this.accessToken.getAccessToken();
      this.trotEvents(accessToken);
    } catch (error) {
      console.log("Error while initiating Simulator", error);
      this.initiateSimulator();
    }
  }

  // Function for processing events by fetching events and inserting into db
  async trotEvents(accessToken: string | undefined) {
    try {
      const response = await trotService.processRaceEvents(accessToken);
      if (response.status === 204) {
        console.log('Request timeout, Hence making new request');
        this.trotEvents(accessToken);
      } else if(response.status === 401) {
        console.log('Session expired, Hence re-authorizing the user');
        this.initiateSimulator();
      }
      this.trotEvents(accessToken);  // getting events recursively
    } catch (error: any) {
      console.log('Error fetching events in controller');
      this.initiateSimulator();
    }
  }
}

export = new RaceService();

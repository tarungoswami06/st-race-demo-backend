import accessTokenMiddleware from "../middlewares/validateToken"; // Middleware for generating and validating access token
import TrotService from "../services/trotService"; // importing Service for doing api's operations


class RaceService {
  private trotService: TrotService;
  private accessToken: accessTokenMiddleware;

  constructor() {
    this.trotService = new TrotService();
    this.accessToken = new accessTokenMiddleware("");
  }

  // Initiate simulator once app starts by authorizing user
  async initiateSimulator() {
    try {
      this.accessToken = new accessTokenMiddleware("");
      const token = await this.accessToken.getAccessToken();
      this.trotEvents(token);
    } catch (error) {
      console.log("Error while initiating Simulator", error);
      this.initiateSimulator();
    }
  }

  // Function for processing events by fetching events and inserting into db
  async trotEvents(token: string) {
    try {
      const response = await this.trotService.processRaceEvents(token);
      if (response.status === 204) {
        console.log('Request timeout, Hence making new request');
        this.trotEvents(token);
      } else if(response.status === 401) {
        console.log('Session expired, Hence re-authorizing the user');
        this.initiateSimulator();
      }
      this.trotEvents(token);  // getting events recursively
    } catch (error) {
      console.log('Error fetching events in controller');
      this.initiateSimulator();
    }
  }
}

export = new RaceService();

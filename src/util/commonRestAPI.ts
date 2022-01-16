import axios from "axios";
import { apiParamsInterface } from "../interfaces/apiParamInterface";

class CommonRestAPI {
  // Common function for API call
  async callAPI(parameters: apiParamsInterface) {
    // Set simulator API URL
    const simulatorUrl: string = process.env.API_ROOT || "";
    // API URL with end point
    const URL = `${simulatorUrl}${parameters.endPoints}`;
    // API Call Params
    const axiosParams = {
      method: parameters.method,
      url: URL,
      headers: parameters.header,
      data: parameters.params,
    };

    return await axios(axiosParams)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default CommonRestAPI;

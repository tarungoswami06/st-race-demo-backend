import axios from "axios";
import { apiParamsInterface } from "../interfaces/apiParamInterface";

class CommonRestAPI {
  // Common function for API call
  async callAPI(parameters: apiParamsInterface) {
    // Set simulator API URL
    const simulatorUrl: string = process.env.API_BASE_URL || "";
    // API URL with end point
    const URL = `${simulatorUrl}${parameters.endPoints}`;
    // API Call Params
    const axiosParams = {
      method: parameters.method,
      url: URL,
      headers: parameters.header,
      data: parameters.params,
    };
    var result: any;
    return await axios(axiosParams)
      .then((response) => {
        result = response;
        return response;
      })
      .catch((error: any) => {
        result = error.response;
        return result;
      });
  }
}

export default CommonRestAPI;

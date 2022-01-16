import { RaceEventModel } from "../models/raceEventModel";  // importing model for race event 
import { EventInterface } from "../interfaces/eventInterface";  // interface for events response
import { StatusCodes } from "http-status-codes";  // importing status code package library
import { API } from "../config/constants";  // importing self configured constants
import { apiParamsInterface } from "../interfaces/apiParamInterface";  // importing api params interface
import CommonRestAPI from "../util/commonRestAPI"; // importing common rest api

class TrotService {
  callAPI = new CommonRestAPI().callAPI;

  async processRaceEvents(token: string): Promise<EventInterface> {  // Service function to fetch all events from server and saving the same into db.
    const eventResponse: EventInterface = await this.fetchAllEvents(token);
    if (eventResponse.status === StatusCodes.OK) {
      const eventModel = new RaceEventModel({
        event: eventResponse.data.event,
        horse: eventResponse.data.horse,
        time: eventResponse.data.time,
      });
      try {
        await eventModel.save();  // Saving event data into mongo db table once response status code is 200 (ok)
        console.info("Event saved");
      } catch (err) {
        console.error("Event saving error with status code: " + eventResponse.status, '. Hence making new request');  // print error in case of not able to get events
      }
    }
    return eventResponse;
  }

  async fetchAllEvents(token: string): Promise<EventInterface> {  // Fetching all race events from the server using given api
    const eventResponse: EventInterface = {
      status: 0,
      data: {
        event: "",
        horse: { id: 0, name: "" },
        time: 0,
      },
    };
    try {
      const { endpoint, method, header } = API.Results;
      const paramaters: apiParamsInterface = {
        endPoints: endpoint,
        method: method,
        token: token,
        header: {
          ...header,
          Authorization: "Bearer " + token
        },
      };
      const result: EventInterface = await this.callAPI(paramaters);  // Calling result api to fetch the events
      console.log('Status Code',result.status);
      if (result.status === StatusCodes.OK) {
        eventResponse.data = result.data;
        eventResponse.status = result.status;
      } else if (result.status === StatusCodes.UNAUTHORIZED) {
        eventResponse.status = result.status;
      } else if (result.status === StatusCodes.NO_CONTENT) {
        eventResponse.status = result.status;
      }
    } catch (err: any) {
      if (
        err &&
        err.response &&
        err.response.status === StatusCodes.UNAUTHORIZED
      ) {
        eventResponse.status = err.response.status;
      } else {
        console.log("Error while fetching events from api: " + err);
      }
    }
    return eventResponse;
  }

}

export default TrotService;
var axios = require('axios');
import { RaceEventModel } from "../models/raceEventModel"; 
import { EventInterface } from "../interfaces/eventsInterface";  // interface for events response

var raceEvents: { [k: string]: any } = {};

const processRaceEvents = async (token: string): Promise<EventInterface> => {  // Service function to fetch all events from server and saving the same into db.
  let eventResponse: any;
  eventResponse = await fetchAllEvents(token);
  if (eventResponse.status === 200) {
    const eventModel = new RaceEventModel({
      event: eventResponse.data.event,
      horse: eventResponse.data.horse,
      time: eventResponse.data.time,
    });
    try {
      await eventModel.save();
      console.info("Event saved");
    } catch (err) {
      console.error("Event saving error with status code: " + eventResponse.status, '. Hence making new request');
    }
  }
  return eventResponse;
}

const fetchAllEvents = async (token: string): Promise<object> => {  // Fetching all race events from the server using given api
  const eventResponse: EventInterface = {
    status: "",
    data: {
      event: "",
      horse: { id: 0, name: "" },
      time: 0,
    },
  };
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  let url = process.env.API_BASE_URL + `/results`;
  try {
    const result: EventInterface = await axios.get(url, { headers: headers });
    console.log('status in get events', result.status);
    if (result.status === 200) {
      eventResponse.data = result.data;
      eventResponse.status = result.status;
    } else if (result.status === 401) {
      eventResponse.status = result.status;
    } else if (result.status === 204) {
      eventResponse.status = result.status;
    }
  } catch (err: any) {
    if (
      err &&
      err.response &&
      err.response.status === 401
    ) {
      eventResponse.status = err.response.status;
    } else {
      console.log("Error while fetching events from api: " + err);
    }
  }
  return eventResponse;
}

raceEvents.processRaceEvents = processRaceEvents

export default raceEvents;
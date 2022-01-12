import app from "../app";
import { HorseEventInterface } from "../interfaces/raceEventInterface";
import { RaceEventModel } from "../models/raceEventModel";


describe("Database integration operations", () => {
  const startEvent: HorseEventInterface = {
    event: "start",
    horse: {
      id: 14,
      name: "Aston",
    },
    time: 0,
  };
  let recordId: string;

  // Checking if db is connected properly
  it("should connect db successfully", async () => {  
    const connection = await app.connectDB();
    expect(connection).toBeTruthy();
  });

  // Test case to create a new event in db
  it("should create new event successfully", async () => {
    const event = new RaceEventModel(startEvent);
    const response = await event.save();
    recordId = response._id.toString();
    expect(response).toBeTruthy();
  });

  // Test case to find a record by record id of inserted event
  it("should find event by record id", async () => {
    const resp = await RaceEventModel.findById(recordId);
    expect(resp).not.toBeUndefined();
  });

  // Test case to delete a record by record id
  it("should delete event by record id", async () => {
    const resp = await RaceEventModel.findByIdAndDelete(recordId);
    expect(resp && resp._id.toString()).toBe(recordId);
  });

  afterAll((done) => {
    app.closeConnection(); // close db connection
    done();
  });
});

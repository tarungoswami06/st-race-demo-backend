import mongoose, { model } from "mongoose";  // importing mongoose package library
import { HorseEventInterface } from "../interfaces/raceEventInterface";  // importing horse event interface

const horseEventSchema = new mongoose.Schema(  // schemea for horse events
  {
    event: {
      type: String,
      required: true,
    },
    horse: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

// Export the model
export const RaceEventModel = model<HorseEventInterface>(
  "HorseEvent",
  horseEventSchema
);

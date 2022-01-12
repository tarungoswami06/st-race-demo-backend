import mongoose, { model } from "mongoose";
import { HorseEventInterface } from "../interfaces/raceEventInterface";

const horseEventSchema = new mongoose.Schema(
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

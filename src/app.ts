import { Application } from "express";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import config from "./config/dbConfig";
import trotController from "./controllers/trotController";

class App {
  public app: Application = express();
  public express;
  public isDbConnected;

  constructor() {
    this.express = express();
    this.setConfig();
    this.isDbConnected = this.connectDB();
  }

  // Set common servers configuration
  private setConfig() {
    // Allows us to receive requests with data in json format
    this.app.use(express.json());
    // Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // Enables cors
    this.app.use(cors());
  }

  // Connect to Mongo DB
  async connectDB() {
    try {
      return await mongoose
        .connect(config.dbConnectionString)
        .then(() => {
          console.log("Database connected Succesfully!");
          return true;
        })
        .catch((err) => {
          console.log("Error while connecting db:", err);
          return false;
        });
    } catch (err) {
      console.log("Not able to connect to MongoDB", err);
      return false;
    }
  }

  // Close Mongo DB connection
  closeConnection() {
    mongoose.connection.close();
  }

  // Initiate race server
  async initiateRaceServer() {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Connected with race server",
      });
    });
    this.express.use("/", router);

    if (await this.isDbConnected) {
      // Initiate Simulator to get events
      trotController.initiateSimulator();
    } else {
      console.log("Database not able to connect!");
    }
  }
}

export default new App();

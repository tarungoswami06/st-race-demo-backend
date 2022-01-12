import dotenv from "dotenv";
dotenv.config();
import App from "./app";

const express = App.express;
const PORT = process.env.PORT || 3001;

// Start the Express server
express.listen(PORT, (err: void) => {
  if (err != null) {
    return console.log("Error in running server", err);
  }
  return console.log(`Server is listening on ${process.env.PORT}`);
});

// Start server
App.initiateRaceServer();

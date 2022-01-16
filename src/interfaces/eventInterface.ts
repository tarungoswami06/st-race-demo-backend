import { HorseEventInterface } from "./raceEventInterface";  // importing race event interface

// Horse event response interface
export interface EventInterface {
  status: number;
  data: HorseEventInterface;
}

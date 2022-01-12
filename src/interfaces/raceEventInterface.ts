// Horse events data interface
export interface HorseEventInterface {
  event: string;
  horse: {
    id: number;
    name: string;
  };
  time: number;
}

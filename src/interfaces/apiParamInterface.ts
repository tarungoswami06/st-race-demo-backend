import { Method } from "axios";

// API parameters interface
export interface apiParamsInterface {
  endPoints: string;
  params?: any;
  method: Method;
  token: string;
  header: any;
}

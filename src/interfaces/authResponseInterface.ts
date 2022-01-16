// authentication response interface
export interface authResponseInterface {
  status: number;
  data: { token: string; error: string };
}

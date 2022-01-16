// User authentication interface
export interface authResponseInterface {
  status: number;
  data: { token: string; error: string };
}

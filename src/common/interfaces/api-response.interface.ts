export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  data: object | object[] | T;
  meta?: object;
}

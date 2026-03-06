export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: object | object[] | T;
  meta?: object;
}

export interface BaseResponse<T = unknown> {
  error?: string;
  data: T | null;
}

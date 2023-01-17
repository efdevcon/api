export interface ApiResponse {
  status: number
  message: string
}

export interface ApiResponseData<T> extends ApiResponse {
  data?: T
}

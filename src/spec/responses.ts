import { String } from "@airtasker/spot"

export interface SuccessResponse {
  /**
   * Success message
   */
  message: String
}

export interface ImageResponse {
  /**
   * image data uri (base64)
   */
  datauri: String
}

export interface ErrorResponse {
  /**
   * Error details
   */
  message: String
}

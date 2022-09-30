import { String } from "@airtasker/spot"

export interface Success {
  /**
   * Response details
   */
  message: String
}

export interface ErrorBadRequest {
  /**
   * Error details
   */
  message: String
}

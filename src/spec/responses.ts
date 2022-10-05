import { String } from "@airtasker/spot"

export interface Success {
  /**
   * Response details
   */
  message: String
}

export interface Error {
  /**
   * Error details
   */
  message: String
}

import {
  String,
  Integer,
  body,
  endpoint,
  request,
  response,
} from "@airtasker/spot"

import { SuccessResponse, ErrorResponse } from "../responses"

/**
 * Send a new email message via [SendGrid](https://sendgrid.com/)
 * Emails are constructed from pre-defined templates with limited variable substitution.
 *
 * @summary
 * Send a templated email
 */
@endpoint({
  method: "POST",
  path: "/email",
})
class SendEmail {
  @request
  request(@body body: SendEmailRequest) {}

  @response({ status: 201 })
  successfulResponse(@body body: SuccessResponse) {}

  @response({ status: 400 })
  errorBadRequest(@body body: ErrorResponse) {}

  @response({ status: 405 })
  errorUnsupportedMethod(@body body: ErrorResponse) {}
}

interface SendEmailRequest {
  /**
   * Recipient's email address
   */
  email: String
  /**
   * Gift seed
   */
  seed: String
  /**
   * Amount of token sent
   */
  amount: Integer
  /**
   * Claim URL
   */
  claim_url: String
  /**
   * Recipient's name (truncated at 20 characters)
   */
  to_name: String
  /**
   * Sender's name (truncated at 20 characters)
   */
  from_name: String
  /**
   * Token symbol (truncated at 10 characters)
   *
   * @default "$DOT"
   */
  token_symbol?: String
  /**
   * Network name (truncated at 20 characters)
   *
   * @default "Polkadot"
   */
  network_name?: String
  /**
   * HTML email template
   *
   * @default "html"
   */
  html_template?: String
  /**
   * Plain text email template
   *
   * @default "txt"
   */
  txt_template?: String
  /**
   * Email subject template
   *
   * @default "subject"
   */
  subject_template?: String
}

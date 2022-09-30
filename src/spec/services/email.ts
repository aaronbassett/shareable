import { String, body, endpoint, request, response } from "@airtasker/spot"

import { Success, ErrorBadRequest } from "../responses"

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
  successfulResponse(@body body: Success) {}

  @response({ status: 400 })
  errorBadRequest(@body body: ErrorBadRequest) {}
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
   * Claim URL
   */
  claim_url: String
  /**
   * Recipient's name (truncated at 20 characters)
   *
   */
  to_name?: String
  /**
   * Sender's name (truncated at 20 characters)
   *
   */
  from_name?: String
  /**
   * Send HTML email
   *
   * @default true
   */
  html?: boolean
  /**
   * Send plain text email
   *
   * @default true
   */
  txt?: boolean
  /**
   * HTML email template
   *
   * @default "default.html"
   */
  html_template?: String
  /**
   * Plain text email template
   *
   * @default "default.txt"
   */
  txt_template?: String
  /**
   * Email subject template
   *
   * @default "subject.txt"
   */
  subject_template?: String
}

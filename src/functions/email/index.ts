import { Handler } from "@netlify/functions"
import { Logger } from "tslog"
import mail from "@sendgrid/mail"
import { renderTemplates } from "./templates"
import schema from "./schema"

mail.setApiKey(process.env.SENDGRID_API_SECREY ?? "")

const log: Logger = new Logger({ name: "shareable" })

const handler: Handler = async (event, context) => {
  if (event.httpMethod == "POST") {
    const inputs = JSON.parse(event.body ?? "")
    const { error, value } = schema.validate(inputs)

    if (!error) {
      const rendered = renderTemplates(value)
      const emailData = {
        to: value.email,
        from: process.env.SENDGRID_SENDER_EMAIL ?? "",
        subject: rendered.subject,
        text: rendered.text ?? undefined,
        html: rendered.html ?? undefined,
      }

      await mail.send(emailData)

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Email sent" }),
      }
    } else {
      log.fatal(error)
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.details[0].message }),
      }
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: `The email endpoint only supports POST, current method ${event.httpMethod}`,
      }),
    }
  }
}

export { handler }

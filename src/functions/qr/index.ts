import { Handler } from "@netlify/functions"
import Jimp from "jimp"
import { Logger } from "tslog"
import QRCode from "qrcode"
import logos from "./logos"
import path from "path"
import schema from "./schema"
import { v4 as uuidv4 } from "uuid"

const log: Logger = new Logger({ name: "shareable" })

const handler: Handler = async (event, context) => {
  if (event.httpMethod == "POST") {
    const inputs = JSON.parse(event.body ?? "")
    const { error, value } = schema.validate(inputs)

    if (!error) {
      const tmpQrImageFilename = path.resolve("/tmp", `${uuidv4()}-qr.png`)
      const qrOptions = {
        version: value.version,
        errorCorrectionLevel: value.error_correction_level.toLowerCase(),
        maskPattern: value.mask_pattern,
        margin: value.margin,
        width: value.width,
        color: {
          dark: value.color_dark,
          light: value.color_light,
        },
      }
      await QRCode.toFile(tmpQrImageFilename, value.claim_url, qrOptions)
      const qrcode = await Jimp.read(tmpQrImageFilename)

      if (value.add_logo) {
        const logo = await Jimp.read(logos[value.logo_name])
        logo.resize(qrcode.bitmap.width / 4, Jimp.AUTO)

        const coords = {
          x: qrcode.bitmap.width / 2 - logo.bitmap.width / 2,
          y: qrcode.bitmap.height / 2 - logo.bitmap.height / 2,
        }

        qrcode.composite(logo, coords.x, coords.y)
      }

      const dataUri = await qrcode.getBase64Async(Jimp.MIME_PNG)

      return {
        statusCode: 200,
        body: JSON.stringify({ datauri: dataUri }),
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.details[0].message }),
      }
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: `The qr endpoint only supports POST, current method ${event.httpMethod}`,
      }),
    }
  }
}

export { handler }

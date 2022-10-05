import {
  String,
  Integer,
  body,
  endpoint,
  request,
  response,
} from "@airtasker/spot"

import { ImageResponse, ErrorResponse } from "../responses"

/**
 * Generate a QR code for a URL
 * Returns the QR code as a base64 encoded image
 *
 * @summary
 * QR code generator
 */
@endpoint({
  method: "POST",
  path: "/qr",
})
class CreateQRCode {
  @request
  request(@body body: CreateQRCodeRequest) {}

  @response({ status: 201 })
  successfulResponse(@body body: ImageResponse) {}

  @response({ status: 400 })
  errorBadRequest(@body body: ErrorResponse) {}
}

interface CreateQRCodeRequest {
  /**
   * Gift seed
   */
  seed: String
  /**
   * Claim URL
   */
  claim_url: String
  /**
   * Add logo to QR code
   *
   * @default true
   */
  add_logo?: boolean
  /**
   * Logo file name
   *
   * @default "polkadot"
   */
  logo_name?: String
  /**
   * QR code width in pixels
   * Forces a specific width for the output image. If width is too small to contain the qr symbol, this option will be ignored.
   *
   * @default 400
   */
  width?: Integer
  /**
   * Define how wide the quiet zone should be in pixels
   *
   * @default 4
   */
  margin?: Integer
  /**
   * Color of dark module. Value must be in hex format (RGBA).
   * Note: dark color should always be darker than color_light.
   *
   * @default "#E6007A"
   */
  color_dark?: String
  /**
   * Color of light module. Value must be in hex format (RGBA).
   * Note: light color should always be lighter than color_dark.
   *
   * @default "#ffffffff"
   */
  color_light?: String
  /**
   * QR code version
   * If not specified the most suitable value will be calculated.
   * https://www.qrcode.com/en/about/version.html
   *
   */
  version?: Integer
  /**
   * Mask Pattern
   * Possible values are 0, 1, 2, 3, 4, 5, 6, 7
   * If not specified the most suitable value will be calculated.
   * https://en.wikipedia.org/wiki/File:QR_Code_Mask_Patterns.svg
   *
   */
  mask_pattern?: Integer
  /**
   * Error correction level (ECL)
   * Possible values are LOW, MEDIUM, QUARTILE, HIGH
   * - LOW: ~7%
   * - MEDIUM: ~15%
   * - QUARTILE: ~25% (default)
   * - HIGH: ~30%
   *
   */
  error_correction_level?: "LOW" | "MEDIUM" | "QUARTILE" | "HIGH"
}

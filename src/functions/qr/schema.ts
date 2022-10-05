import Joi from "joi"
import logos from "./logos"

export default Joi.object({
  seed: Joi.string().hex().length(30).required(),
  claim_url: Joi.string().uri({ scheme: "https" }).required(),
  add_logo: Joi.boolean().default(true),
  logo_name: Joi.string()
    .valid(...Object.keys(logos))
    .default("polkadot"),
  width: Joi.number().default(400),
  margin: Joi.number().default(4),
  color_dark: Joi.string().min(4).max(9).pattern(/^#.*$/).default("#E6007A"),
  color_light: Joi.string().min(4).max(9).pattern(/^#.*$/).default("#ffffffff"),
  version: Joi.number().min(1).max(40),
  mask_pattern: Joi.number().min(1).max(7),
  error_correction_level: Joi.string()
    .uppercase()
    .valid("LOW", "MEDIUM", "QUARTILE", "HIGH")
    .default("QUARTILE"),
})

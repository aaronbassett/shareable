import Joi from "joi"
import templates from "./templates"

export default Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, maxDomainSegments: 5 })
    .required(),
  amount: Joi.number().required(),
  seed: Joi.string().hex().length(30).required(),
  claim_url: Joi.string().uri({ scheme: "https" }).required(),
  to_name: Joi.string().max(20).truncate().required(),
  from_name: Joi.string().max(20).truncate().required(),
  html_template: Joi.string()
    .max(260)
    .valid(...Object.keys(templates))
    .default("html"),
  txt_template: Joi.string()
    .max(260)
    .valid(...Object.keys(templates))
    .default("txt"),
  subject_template: Joi.string()
    .max(260)
    .valid(...Object.keys(templates))
    .default("subject"),
  token_symbol: Joi.string().max(10).default("$DOT"),
  network_name: Joi.string().max(20).truncate().default("Polkadot"),
})

const Joi = require("joi");

const carrierSchema = Joi.object({
  name: Joi.string().min(2).required(),       // e.g., AT&T, Verizon
  country: Joi.string().min(2).required(),
  networkType: Joi.string().valid("GSM", "CDMA", "LTE", "5G", "Mixed").required(),
  website: Joi.string().uri().required(),
  supportNumber: Joi.string().min(7).required(),
  notes: Joi.string().allow("").optional()
});

module.exports = { carrierSchema };

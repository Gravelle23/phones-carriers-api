const Joi = require("joi");

const phoneSchema = Joi.object({
  brand: Joi.string().min(2).required(),
  model: Joi.string().min(1).required(),
  storageGB: Joi.number().integer().min(8).required(),
  color: Joi.string().min(2).required(),
  priceUSD: Joi.number().min(0).required(),
  releaseYear: Joi.number().integer().min(2000).max(2100).required(),
  carrierId: Joi.string().required(),       // links phone -> carrier
  is5G: Joi.boolean().required(),
  os: Joi.string().valid("iOS", "Android", "Other").required(),
  notes: Joi.string().allow("").optional()
});

module.exports = { phoneSchema };

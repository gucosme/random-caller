require('dotenv').config();
const Joi = require('@hapi/joi');

const logger = require('./logger');

const configSchema = Joi.object().keys({
  SPREADSHEET_URL: Joi.string().required(),
  TERAVOZ_URL: Joi.string().required(),
  TERAVOZ_ACCESS_TOKEN: Joi.string().required(),
  HTTP_PORT: Joi.number().required(),
});

const config = {
  SPREADSHEET_URL: process.env.SPREADSHEET_URL,
  TERAVOZ_URL: process.env.TERAVOZ_URL,
  TERAVOZ_ACCESS_TOKEN: process.env.TERAVOZ_ACCESS_TOKEN,
  HTTP_PORT: process.env.HTTP_PORT,
};

const { error, value } = configSchema.validate(config);
if (error) {
  logger.error(error);
  process.exit();
}

module.exports = value;

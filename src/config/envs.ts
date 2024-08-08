import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  TECHPRODUCTS_MICROSERVICE_HOST: string;
  TECHPRODUCTS_MICROSERVICE_PORT: number;
  CLOTHES_MICROSERVICE_HOST: string;
  CLOTHES_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    TECHPRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    TECHPRODUCTS_MICROSERVICE_PORT: joi.string().required(),
    CLOTHES_MICROSERVICE_HOST: joi.string().required(),
    CLOTHES_MICROSERVICE_PORT: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error('Config Validation Error: ' + error);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  TECHPRODUCTS_MICROSERVICE_HOST: envVars.TECHPRODUCTS_MICROSERVICE_HOST,
  TECHPRODUCTS_MICROSERVICE_PORT: envVars.TECHPRODUCTS_MICROSERVICE_PORT,
  CLOTHES_MICROSERVICE_HOST: envVars.CLOTHES_MICROSERVICE_HOST,
  CLOTHES_MICROSERVICE_PORT: envVars.CLOTHES_MICROSERVICE_PORT,
};

import Ajv from "ajv";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";

// Default App Id for Tenant Management
// User may overwritte to set their own appid => clientsecret in keyvault
const aadappid = process.env.REACT_APP_AADAPPID_MANAGEMENT;

const schema = {
  title: "Add Tenant",
  type: "object",
  properties: {
    name: { type: "string" },
    tenantId: { type: "string" },
    appId: {
      type: "string",
      default: aadappid
    }
  },
  required: ["name", "tenantId", "appId"],
};

const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return (model) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge(schema, schemaValidator);
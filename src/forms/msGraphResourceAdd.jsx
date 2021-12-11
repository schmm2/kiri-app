import Ajv from "ajv";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";

const schema = {
    title: "Add Ms Graph Resource",
    type: "object",
    properties: {
        name: { type: "string" },
        resource: { type: "string" },
        version: {
            type: "string",
            options: [
                {
                    label: 'beta',
                    value: 'beta'
                },
                {
                    label: 'v1.0',
                    value: 'v1.0'
                }
            ]
        }
    },
    required: ["name", "version", "resource"],
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
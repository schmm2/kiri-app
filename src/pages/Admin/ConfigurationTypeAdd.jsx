import React, { useState } from "react";
import { configurationTypeCreateOne as configurationTypeCreateOneMutation } from "graphql/mutations";
import { msGraphResourceMany } from "graphql/queries";
import { Link } from "react-router-dom";
import { AutoForm } from 'uniforms-antd';
import { Button } from "antd"
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { useQuery, useMutation } from '@apollo/client';
import Ajv from "ajv";
import DefaultPage from '../../layouts/DefaultPage';
import { useNavigate } from "react-router-dom";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

export default function ConfigurationTypeAdd() {
    const [configurationTypeSchema, setConfigurationTypeSchema] = useState(null);
    const navigate = useNavigate();

    const [createConfigurationType] = useMutation(configurationTypeCreateOneMutation, {
        onCompleted(data) {
            // console.log(data);
            navigate("/configurationTypes");
        }
    });

    const { loading } = useQuery(msGraphResourceMany, {
        onCompleted: data => {
            let schema = buildSchema(data.msGraphResourceMany);
            let schemaValidator = createValidator(schema);
            let schemaBridge = new JSONSchemaBridge(schema, schemaValidator);

            setConfigurationTypeSchema(schemaBridge);
        }
    });

    function buildSchema(msGraphResources) {
        let msGraphResourceOptions = msGraphResources.map(resource => {
            return {
                label: resource.name,
                value: resource._id
            }
        });

        const schema = {
            title: "Add Configuration Type",
            type: "object",
            properties: {
                name: { type: "string" },
                platform: {
                    type: "string",
                    options: [
                        {
                            label: 'Windows 10',
                            value: 'windows10'
                        },
                        {
                            label: 'Windows General',
                            value: 'windows'
                        },
                        {
                            label: 'Intune',
                            value: 'intune'
                        },
                        {
                            label: 'Android',
                            value: 'android'
                        },
                        {
                            label: 'Android DeviceAdministrator',
                            value: 'androiddeviceadministrator'
                        },
                        {
                            label: 'Android Enterprise',
                            value: 'androidenterprise'
                        },
                        {
                            label: 'iOS / iPadOs',
                            value: 'iosipados'
                        },
                        {
                            label: 'Mac Os',
                            value: 'macos'
                        },
                    ]
                },
                category: {
                    type: "string",
                    options: [
                        {
                            label: 'Configuration Profile',
                            value: 'configurationprofile'
                        },
                        {
                            label: 'Compliance',
                            value: 'compliance'
                        },
                        {
                            label: 'App Protection',
                            value: 'appprotection'
                        },
                        {
                            label: 'Enrollment',
                            value: 'enrollment'
                        },
                        {
                            label: 'Update Ring',
                            value: 'updatering'
                        },
                        {
                            label: 'App Configuration',
                            value: 'appconfiguration'
                        }
                    ]
                },
                msGraphResource: {
                    type: "string",
                    options: msGraphResourceOptions
                }
            },
            required: ["msGraphResource", "platform", "category", "name"],
        };
        return schema;
    }

    function createValidator(schema) {
        const validator = ajv.compile(schema);
        return (model) => {
            validator(model);
            return validator.errors?.length ? { details: validator.errors } : null;
        };
    }


    return (
        <DefaultPage>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {
                        configurationTypeSchema &&
                        <AutoForm schema={configurationTypeSchema}
                            onSubmit={data => { createConfigurationType({ variables: { record: data } }) }} />
                    }
                </div>
            )}
            <Button>
                <Link to={"/configurationTypes"}>Back</Link>
            </Button>
        </DefaultPage>
    );
}

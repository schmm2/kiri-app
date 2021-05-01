import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createConfigurationType as createConfigurationTypeMutation } from "graphql/mutations";
import { listMsGraphResources } from "graphql/queries";
import { Link } from "react-router-dom";
import { AutoForm } from 'uniforms-antd';
import { Button } from "antd"
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true, useDefaults: true });

export default function ConfigurationTypeAdd() {

    const [configurationTypeSchema, setConfigurationTypeSchema] = useState(null);
    const [loading, setLoading] = useState(true);

    function buildSchema(msGraphResources) {
        let msGraphResourceOptions = msGraphResources.map(resource =>{
            return {
                label: resource.name,
                value: resource.id
            }
        });

        const schema = {
            title: "Add Configuration Type",
            type: "object",
            properties: {
                odataType: { type: "string" },
                label: { type: "string" },
                configurationTypeMsGraphResourceId:{
                    type: "string",
                    options: msGraphResourceOptions
                },
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
            },
            required: ["configurationTypeMsGraphResourceId", "odataType", "platform", "category", "label"],
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


    async function fetch() {
        // get current ms graph Resource data
        let msGraphResourcesData = await API.graphql(graphqlOperation(listMsGraphResources));
        // console.log(msGraphResourcesData);
        msGraphResourcesData = msGraphResourcesData.data.listMSGraphResources.items;

        let schema = buildSchema(msGraphResourcesData);
        const schemaValidator = createValidator(schema);
        let schemaBridge = new JSONSchemaBridge(schema, schemaValidator);
        setConfigurationTypeSchema(schemaBridge);
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    }, []);

    function createConfigurationType(values) {
        console.log(values);

        API.graphql(
            graphqlOperation(createConfigurationTypeMutation, { input: values })
        ).then((result) => {
            console.log("successfull sent data");
            console.log(result);
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                    <div>
                        <AutoForm schema={configurationTypeSchema} onSubmit={createConfigurationType} />
                        <Button>
                            <Link to={"/configurationTypes"}>Back</Link>
                        </Button>
                    </div>
                )}
        </div>
    );
}

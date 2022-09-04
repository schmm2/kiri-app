import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import msgraphResourcesTemplate from './documentTemplates/msgraphresources.json';

// fill database with predefined data
async function stageDatabase(console) {
    let msGraphResourceObjectCount = 0;
    let configurationTypeObjectCount = 0;

    console.log("processing " + msgraphResourcesTemplate.length + " msgraphResources");

    for (let m = 0; m < msgraphResourcesTemplate.length; m++) {
        let msgraphResourceTemplate = msgraphResourcesTemplate[m];
        //console.log( msgraphResourcesTemplate[m]);

        // check if element already exists
        await MsGraphResource.find({ name: msgraphResourceTemplate.name }).
            then(async msGraphResources => {
                let msGraphResourceCreated = null;

                if (msGraphResources.length == 0) {

                    // entry not found so we need to add the element
                    msGraphResourceCreated = await MsGraphResource.create({
                        name: msgraphResourceTemplate.name,
                        resource: msgraphResourceTemplate.resource,
                        version: msgraphResourceTemplate.version,
                        category: msgraphResourceTemplate.category ? msgraphResourceTemplate.category: "configuration",
                        expandAttributes: msgraphResourceTemplate.expandAttributes ? msgraphResourceTemplate.expandAttributes: null,
                        transformRulesCreate: msgraphResourceTemplate.transformRulesCreate ? msgraphResourceTemplate.transformRulesCreate: [],
                        transformRulesPatch: msgraphResourceTemplate.transformRulesPatch ? msgraphResourceTemplate.transformRulesPatch : [],
                        nameAttribute: msgraphResourceTemplate.nameAttribute ? msgraphResourceTemplate.nameAttribute : "displayName" 
                    });
                    console.log("mongoose, created msgraphresource document: " + msGraphResourceCreated.name);
                    //console.log(msGraphResourceCreated)
                    msGraphResourceObjectCount++;
                }
                else {
                    console.log("mongoose, msgraphresource document already exists: " + msGraphResources[0].name);
                    msGraphResourceCreated = msGraphResources[0];
                }
                //console.log(msGraphResource);

                // now the graphresource exists, add related configurationtypes
                if (msgraphResourceTemplate.configurationTypes) {             
                    for (let r = 0; r < msgraphResourcesTemplate[m].configurationTypes.length; r++) {
                        let configurationTypeTemplate = msgraphResourcesTemplate[m].configurationTypes[r];
                        await ConfigurationType.find({ name: configurationTypeTemplate.name }).
                            then(async configurationTypes => {
                                if (configurationTypes.length == 0) {
                                    // configtype not yet created
                                    try {
                                        let configurationTypeCreated = await ConfigurationType.create({
                                            name: configurationTypeTemplate.name,
                                            platform: configurationTypeTemplate.platform,
                                            category: configurationTypeTemplate.category,
                                            msGraphResource: msGraphResourceCreated.id
                                        });
                                        console.log("mongoose, created resourcetype document: " + configurationTypeCreated.name);
                                        configurationTypeObjectCount++;

                                    } catch (error) {
                                        console.log("unable to create configurationtype: " + configurationTypeTemplate.name)
                                        console.log(error);
                                    }
                                }else{
                                    console.log("mongoose, configurationType document already exists: " + configurationTypes[0].name);
                                }
                            });
                    }
                }
            });
    }

    return {
        "msGraphResources": msGraphResourceObjectCount,
        "configurationTypes": configurationTypeObjectCount
    }
}


const httpTrigger: AzureFunction = async function (console: Context, req: HttpRequest): Promise<void> {
    console.log('HTTP trigger function processed a request.');

    // prestage conent
    let reportCreatedObjects = await stageDatabase(console);
    const responseMessage = reportCreatedObjects;
    
    console.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;
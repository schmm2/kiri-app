import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;

/* Amplify Params - DO NOT EDIT
    API_KIRI_GRAPHQLAPIIDOUTPUT
    API_KIRI_TENANTTABLE_ARN
    API_KIRI_TENANTTABLE_NAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */

var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var tableTenants = process.env.API_KIRI_TENANTTABLE_NAME
var response;

// SQS
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
var sqsUrl = process.env.SQSUrl

async function sendSQS(record) {
    if (record.tenantId) {
        var params = {
            // Remove DelaySeconds parameter and value for FIFO queues
            DelaySeconds: 1,
            MessageAttributes: {
                "tenantId": {
                    DataType: "String",
                    StringValue: record.tenantId
                }
            },
            MessageBody: JSON.stringify(record),
            QueueUrl: sqsUrl
        };
        return await sqs.sendMessage(params).promise();
    }
    return null;
}

exports.handler = async (event, context, callback) => {
    // console.log("EVENT");
    // console.log(event);

    let tenantId = null;
    if (event.arguments) {
        tenantId = event.arguments.tenantId;
    }

    let owner = null
    if (event.identity) {
        owner = event.identity.username
    }

    if (tenantId) {
        let scanResults = [];
        let items;
        let sendResponses;

        // get tenant matching the id
        console.log("tenantId: " + tenantId);

        let params = {
            TableName: tableTenants,
            FilterExpression: 'id = :id AND #owner = :owner',
            ExpressionAttributeNames: {
                "#owner": 'owner',
            },
            ExpressionAttributeValues: {
                ":id": tenantId,
                ":owner": owner
            }
        };


        do {
            items = await docClient.scan(params).promise();
            // console.log(items);

            sendResponses = await Promise.all(
                items.Items.map(async (item) => {
                    scanResults.push(item);
                    let sendResponse = await sendSQS(item);
                    return sendResponse;
                })
            )
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey != "undefined");

        // console.log(scanResults);
        // console.log(sendResponses);

        response = {
            statusCode: 200,
            body: {
                ok: true,
                message: "update job created for tenant " + tenantId
            },
        };
        // console.log("job created for tenantId " + tenantId);

    } else {
        response = {
            statusCode: 400,
            body: {
                ok: false,
                message: "invalid paramters, no tenantid provided"
            }
        };
        // console.log("error: no tenantid provided");
    }
    return(JSON.stringify(response));
};
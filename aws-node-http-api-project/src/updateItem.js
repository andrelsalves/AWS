"use strict"

const AWS = require("aws-sdk")

const updateItem = async(event) => {

    const {itemStatus} = JSON.parse(event.body);
    const {id} = event.path.Patameters

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    await dynamoDB.update({
        TableName: "ItemTable",
        Key: {id},
        UpdateExpression: "set itemStatus = :itemStatus",
        ExpressionAttributeValues: {
            "itemStatus": itemStatus
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(
            { msg: "Item updated"}
        ),
    };
}

module.exports = {
    handler:updateItem
};
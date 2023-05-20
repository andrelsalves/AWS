"use strict"

const {v4} = require("uuid")
const AWS = require("aws-sdk")

const addItem = async(event) => {

    const {item} = JSON.parse(event.body);
    const createAt = new Date().toISOString();
    const id = v4()

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const newItem = {
        id,
        item,
        createAt,
        itemStatus: false
    }

    await dynamoDB.put({
        TableName:"ItemTable",
        Item: newItem
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    };

}

module.exports = {
    handler:addItem
}
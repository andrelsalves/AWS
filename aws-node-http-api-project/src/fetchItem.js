"use strict"

const AWS = require("aws-sdk")

const fetchItem = async(event) => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.path.Patameters

    let items;

    try {
        const results = await dynamoDB.get({
            TableName: "ItemTable",
            key: {id}
        }).promise();

        item = result.Item;

    } catch (error) {

        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
}

module.exports = {
    handler:fetchItem
};
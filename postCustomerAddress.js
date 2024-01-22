"use strict";
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, "base64").toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  if (!body.customerId) {
    return {
      statusCode: 404,
    };
  }

  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      pk: `CUSTOMER#${body.customerId}`,
      sk: "ADDRESS",
      address: body.address,
      city: body.city,
      state: body.state,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
  };
};

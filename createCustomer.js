"use strict";
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

module.exports.handler = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, "base64").toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const customerId = uuidv4();
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
    Item: {
      pk: `CUSTOMER#${customerId}`,
      sk: "PROFILE",
      name: body.name,
      email: body.email,
    },
  };
  await dynamoDb.put(putParams).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ customerId }),
  };
};

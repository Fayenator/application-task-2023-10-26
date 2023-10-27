	
'use strict';
const AWS = require('aws-sdk');
 
module.exports.addMeasurement = async (event) => {
  const body = JSON.parse(Buffer.from(event.body, 'base64').toString());
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const putParams = {
    TableName: process.env.DYNAMODB_MEASUREMENT_TABLE,
    Item: {
      measurement_id: body.measurement_id,
      sensor_id: body.sensor_id,
      temperature: body.temperature,
    },
  };
  await dynamoDb.put(putParams).promise();
 
  return {
    statusCode: 201,
  };
};
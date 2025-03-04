const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Get user ID from Cognito authorizer
    const userId = event.requestContext.authorizer.claims.sub;
    
    // Query DynamoDB for this user's survey
    const result = await dynamoDB.query({
      TableName: process.env.SURVEYS_TABLE,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
      Limit: 1, // We only want the most recent survey
      ScanIndexForward: false // Sort by sort key (surveyId) in descending order
    }).promise();
    
    // Check if the user has completed a survey
    if (result.Items.length === 0) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          message: 'No survey found for this user'
        })
      };
    }
    
    // Return the user's survey response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.Items[0])
    };
  } catch (error) {
    console.error('Error retrieving user survey:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Error retrieving user survey',
        errorMessage: error.message
      })
    };
  }
}; 
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Joi = require('joi');

// Define validation schema for user registration
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required()
});

exports.handler = async (event) => {
  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    
    // Validate user data
    const { error, value } = userSchema.validate(requestBody);
    
    if (error) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          message: 'Invalid user data',
          errors: error.details.map(detail => detail.message)
        })
      };
    }
    
    const { email, password, name } = value;
    
    // Create a new user in Cognito
    const signUpParams = {
      ClientId: process.env.CLIENT_ID || '', // This would be populated from environment variables
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'name',
          Value: name
        },
        {
          Name: 'email',
          Value: email
        }
      ]
    };
    
    const cognitoResponse = await cognito.signUp(signUpParams).promise();
    const userId = cognitoResponse.UserSub;
    
    // Store additional user info in DynamoDB
    await dynamoDB.put({
      TableName: process.env.USERS_TABLE,
      Item: {
        userId,
        email,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }).promise();
    
    // Auto-confirm the user (in production, you would typically send a verification email)
    await cognito.adminConfirmSignUp({
      UserPoolId: process.env.USER_POOL_ID || '', // This would be populated from environment variables
      Username: email
    }).promise();
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'User registered successfully',
        userId
      })
    };
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle specific Cognito errors
    if (error.code === 'UsernameExistsException') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          message: 'User with this email already exists'
        })
      };
    }
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Error creating user',
        errorMessage: error.message
      })
    };
  }
}; 
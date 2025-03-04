# Cardinal Backend

This is the serverless backend for the Cardinal Stanford Community Survey application. It's built using AWS Serverless Application Model (SAM) and deploys to AWS Lambda, API Gateway, DynamoDB, and Cognito.

## Architecture

The backend uses a serverless architecture with the following components:

- **AWS Lambda:** Serverless functions that handle various API requests
- **Amazon API Gateway:** Provides RESTful API endpoints
- **Amazon DynamoDB:** NoSQL database for storing survey responses and user data
- **Amazon Cognito:** Handles user authentication and authorization
- **AWS SAM:** Infrastructure as Code for defining and deploying all resources

## Directory Structure

```
backend/
├── src/
│   ├── functions/          # Lambda function handlers
│   ├── models/             # Data models and schemas
│   └── util/               # Utility functions
├── template.yaml           # AWS SAM template defining infrastructure
├── package.json            # Node.js dependencies and scripts
└── README.md               # This file
```

## Lambda Functions

- **submitSurvey:** Validates and stores survey responses
- **getSurveyStats:** Retrieves aggregated statistics from survey responses
- **getUserSurvey:** Gets a specific user's survey response
- **userSignup:** Handles user registration

## DynamoDB Tables

- **CardinalSurveys:** Stores all survey responses
- **CardinalUsers:** Stores user information

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) installed and configured
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) installed
- [Node.js](https://nodejs.org/) 18.x or later

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the local API for testing:
   ```
   npm run local
   ```

3. The API will be available at `http://localhost:3000/`

## Deployment

1. Build the application:
   ```
   npm run build
   ```

2. Deploy to AWS (first time will be guided):
   ```
   npm run deploy
   ```

3. For subsequent deployments:
   ```
   sam deploy
   ```

## Connecting the Frontend

After deployment, you'll receive outputs including:
- API Gateway endpoint URL
- Cognito User Pool ID
- Cognito User Pool Client ID

Update the frontend environment variables with these values:

```
NEXT_PUBLIC_API_URL=https://xxxx.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_COGNITO_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Testing

Run tests with:
```
npm test
```

## Security Considerations

- API Gateway endpoints are protected with Cognito authorizers where needed
- DynamoDB tables have appropriate IAM policies
- Cognito handles secure user authentication

## Cleanup

To delete all resources created by this backend:
```
aws cloudformation delete-stack --stack-name cardinal-backend
``` 
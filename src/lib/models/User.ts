// User model for authentication
export interface User {
  id: string;
  email: string;
  username?: string;
  createdAt: string;
  updatedAt: string;
  surveyCompleted: boolean;
  surveyId?: string;
}

// For DynamoDB with AWS Amplify
export const schema = {
  name: "User",
  fields: {
    id: { type: "ID", isRequired: true },
    email: { type: "String", isRequired: true },
    username: { type: "String" },
    createdAt: { type: "AWSDateTime", isRequired: true },
    updatedAt: { type: "AWSDateTime", isRequired: true },
    surveyCompleted: { type: "Boolean", isRequired: true },
    surveyId: { type: "ID" }
  },
  primaryKey: { name: "id", type: "String" },
  indexes: [
    { name: "byEmail", fields: ["email"] }
  ]
}; 
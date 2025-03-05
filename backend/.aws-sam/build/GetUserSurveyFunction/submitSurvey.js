const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Joi = require('joi');

// Define validation schema for our survey
const surveySchema = Joi.object({
  // Demographics & Admissions
  gender: Joi.string().required(),
  transgender: Joi.string().required(),
  orientation: Joi.string().required(),
  ethnicity: Joi.string().required(),
  age: Joi.string().required(),
  recruitedAthlete: Joi.string().required(),
  familyIncome: Joi.string().required(),
  birthOrder: Joi.string().required(),
  secondarySchool: Joi.string().required(),
  legacy: Joi.string().required(),
  firstGen: Joi.string().required(),
  financialAid: Joi.string().required(),
  gapYear: Joi.string().required(),
  placeOfOrigin: Joi.string().required(),
  communityType: Joi.string().required(),
  topChoice: Joi.string().required(),
  earlyAction: Joi.string().required(),
  privateCounselor: Joi.string().required(),
  
  // Politics & Beliefs
  religion: Joi.string().required(),
  religiosity: Joi.string().required(),
  politics: Joi.string().required(),
  politicalParty: Joi.string().required(),
  
  // Academics and Extracurriculars
  studyHours: Joi.string().required(),
  mathLevel: Joi.string().required(),
  highSchoolExtracurriculars: Joi.array().items(Joi.string()).required(),
  stanfordExtracurriculars: Joi.array().items(Joi.string()).required(),
  studentGovPresident: Joi.string().required(),
  academicInterest: Joi.string().required(),
  postGraduatePlans: Joi.string().required(),
  
  // Lifestyle
  virgin: Joi.string().required(),
  firstSexualActivity: Joi.string().required(),
  sexualPartners: Joi.string().required(),
  computer: Joi.string().required()
});

exports.handler = async (event) => {
  try {
    // Get user ID from Cognito authorizer
    const userId = event.requestContext.authorizer.claims.sub;
    
    // Parse request body
    const requestBody = JSON.parse(event.body);
    
    // Validate survey data
    const { error, value } = surveySchema.validate(requestBody);
    
    if (error) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          message: 'Invalid survey data',
          errors: error.details.map(detail => detail.message)
        })
      };
    }
    
    // Create a unique ID for this survey submission
    const surveyId = uuidv4();
    const timestamp = new Date().toISOString();
    
    // Prepare item for DynamoDB
    const surveyItem = {
      userId,
      surveyId,
      timestamp,
      ...value
    };
    
    // Store in DynamoDB
    await dynamoDB.put({
      TableName: process.env.SURVEYS_TABLE,
      Item: surveyItem
    }).promise();
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Survey submitted successfully',
        surveyId
      })
    };
  } catch (error) {
    console.error('Error submitting survey:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Internal server error',
        errorMessage: error.message
      })
    };
  }
}; 
/* Amplify Params - DO NOT EDIT
	API_CARDINAL_GRAPHQLAPIENDPOINTOUTPUT
	API_CARDINAL_GRAPHQLAPIIDOUTPUT
	API_CARDINAL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const https = require('https');
const urlParse = require('url').URL;

// Create DocumentClient for DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();

// GraphQL query to get all surveys
const listSurveysQuery = /* GraphQL */ `
  query ListSurveys($limit: Int, $nextToken: String) {
    listSurveys(limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        completedAt
        gender
        transgender
        orientation
        ethnicity
        age
        recruitedAthlete
        familyIncome
        birthOrder
        secondarySchool
        legacy
        firstGen
        financialAid
        gapYear
        placeOfOrigin
        communityType
        topChoice
        earlyAction
        privateCounselor
        religion
        religiosity
        politics
        politicalParty
        studyHours
        mathLevel
        highSchoolExtracurriculars
        stanfordExtracurriculars
        studentGovPresident
        academicInterest
        postGraduatePlans
        virgin
        firstSexualActivity
        sexualPartners
        computer
      }
      nextToken
    }
  }
`;

/**
 * GraphQL request function
 */
const request = (queryDetails, variables) => {
  const endpoint = new urlParse(process.env.API_CARDINAL_GRAPHQLAPIENDPOINTOUTPUT);
  const req = new AWS.HttpRequest(endpoint, process.env.REGION);

  req.method = 'POST';
  req.path = '/graphql';
  req.headers.host = endpoint.host;
  req.headers['Content-Type'] = 'application/json';
  req.body = JSON.stringify({
    query: queryDetails,
    variables: variables
  });

  const signer = new AWS.Signers.V4(req, 'appsync', true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  return new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint.host }, (result) => {
      let data = '';
      result.on('data', (chunk) => {
        data += chunk;
      });
      result.on('end', () => {
        resolve(JSON.parse(data.toString()));
      });
    });

    httpRequest.on('error', (error) => {
      reject(error);
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });
};

/**
 * Handler for aggregating data for a specific field
 */
const aggregateSurveyData = async (field) => {
  try {
    // Get all surveys
    const result = await request(listSurveysQuery, { limit: 1000 });
    const surveys = result.data.listSurveys.items;
    
    // Initialize counts
    const counts = {};
    
    // Count occurrences of each value
    surveys.forEach(survey => {
      const value = survey[field];
      
      if (Array.isArray(value)) {
        // Handle array fields like extracurriculars
        value.forEach(item => {
          counts[item] = (counts[item] || 0) + 1;
        });
      } else if (value) {
        // Handle scalar fields
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    
    // Convert to array format
    const countsArray = Object.keys(counts).map(value => ({
      value,
      count: counts[value]
    }));
    
    // Sort by count descending
    countsArray.sort((a, b) => b.count - a.count);
    
    return {
      field,
      counts: countsArray
    };
  } catch (error) {
    console.error(`Error aggregating data for field ${field}:`, error);
    throw error;
  }
};

/**
 * Handler for correlation analysis between two fields
 */
const correlationAnalysis = async (field1, field2) => {
  try {
    // Get all surveys
    const result = await request(listSurveysQuery, { limit: 1000 });
    const surveys = result.data.listSurveys.items;
    
    // Initialize correlation map
    const correlationMap = {};
    
    // Count co-occurrences
    surveys.forEach(survey => {
      const value1 = survey[field1];
      const value2 = survey[field2];
      
      if (!value1 || !value2) return;
      
      const key = `${value1}|${value2}`;
      correlationMap[key] = (correlationMap[key] || 0) + 1;
    });
    
    // Convert to array format
    const correlations = Object.keys(correlationMap).map(key => {
      const [value1, value2] = key.split('|');
      return {
        value1,
        value2,
        count: correlationMap[key]
      };
    });
    
    // Sort by count descending
    correlations.sort((a, b) => b.count - a.count);
    
    return {
      field1,
      field2,
      correlations
    };
  } catch (error) {
    console.error(`Error analyzing correlation between ${field1} and ${field2}:`, error);
    throw error;
  }
};

/**
 * Main handler for Lambda function
 */
exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  
  try {
    // Get the operation from the event
    const { field, field1, field2, operation } = event.arguments;
    
    let result;
    
    // Handle different operations
    switch (operation) {
      case 'aggregateSurveyData':
        result = await aggregateSurveyData(field);
        break;
      case 'correlationAnalysis':
        result = await correlationAnalysis(field1, field2);
        break;
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
    
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Scan the surveys table to get all responses
    // In a production environment with large datasets, we would use a more efficient approach
    // like pre-calculating statistics and storing them in a separate table
    const { Items } = await dynamoDB.scan({
      TableName: process.env.SURVEYS_TABLE
    }).promise();
    
    // Process the data to generate statistics
    const stats = processStats(Items);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(stats)
    };
  } catch (error) {
    console.error('Error getting survey stats:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Error retrieving survey statistics',
        errorMessage: error.message
      })
    };
  }
};

// Function to process survey data and generate statistics
function processStats(surveys) {
  const stats = {
    totalResponses: surveys.length,
    categories: {
      demographics: generateCategoryStats(surveys, [
        'gender', 'transgender', 'orientation', 'ethnicity', 'age',
        'recruitedAthlete', 'familyIncome', 'birthOrder', 'secondarySchool',
        'legacy', 'firstGen', 'financialAid', 'gapYear', 'placeOfOrigin',
        'communityType', 'topChoice', 'earlyAction', 'privateCounselor'
      ]),
      politics: generateCategoryStats(surveys, [
        'religion', 'religiosity', 'politics', 'politicalParty'
      ]),
      academics: generateCategoryStats(surveys, [
        'studyHours', 'mathLevel', 'highSchoolExtracurriculars', 
        'stanfordExtracurriculars', 'studentGovPresident', 
        'academicInterest', 'postGraduatePlans'
      ]),
      lifestyle: generateCategoryStats(surveys, [
        'virgin', 'firstSexualActivity', 'sexualPartners', 'computer'
      ])
    }
  };
  
  return stats;
}

// Function to generate statistics for a category of questions
function generateCategoryStats(surveys, fields) {
  const categoryStats = {};
  
  fields.forEach(field => {
    const fieldStats = {};
    
    // Handle array fields differently (like highSchoolExtracurriculars)
    if (surveys.length > 0 && Array.isArray(surveys[0][field])) {
      // For array fields, count occurrences of each value across all arrays
      surveys.forEach(survey => {
        if (survey[field] && Array.isArray(survey[field])) {
          survey[field].forEach(value => {
            fieldStats[value] = (fieldStats[value] || 0) + 1;
          });
        }
      });
    } else {
      // For regular fields, count occurrences of each value
      surveys.forEach(survey => {
        if (survey[field]) {
          const value = survey[field];
          fieldStats[value] = (fieldStats[value] || 0) + 1;
        }
      });
    }
    
    // Calculate percentages
    const totalResponses = surveys.length;
    const fieldData = {
      counts: fieldStats,
      percentages: {}
    };
    
    // Convert counts to percentages
    Object.keys(fieldStats).forEach(value => {
      fieldData.percentages[value] = (fieldStats[value] / totalResponses) * 100;
    });
    
    categoryStats[field] = fieldData;
  });
  
  return categoryStats;
} 
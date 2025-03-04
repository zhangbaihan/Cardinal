import { API, graphqlOperation } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Survey } from '../models/Survey';

/**
 * GraphQL operations for survey data
 */
const createSurveyMutation = /* GraphQL */ `
  mutation CreateSurvey($input: CreateSurveyInput!) {
    createSurvey(input: $input) {
      id
      userId
      completedAt
    }
  }
`;

const getSurveyByIdQuery = /* GraphQL */ `
  query GetSurvey($id: ID!) {
    getSurvey(id: $id) {
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
  }
`;

const listSurveysQuery = /* GraphQL */ `
  query ListSurveys($limit: Int, $nextToken: String) {
    listSurveys(limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        completedAt
      }
      nextToken
    }
  }
`;

const getSurveysByUserIdQuery = /* GraphQL */ `
  query GetSurveysByUserId($userId: ID!) {
    surveysByUser(userId: $userId) {
      items {
        id
        userId
        completedAt
      }
    }
  }
`;

/**
 * Service for handling survey data
 */
export const surveyService = {
  /**
   * Submit a new survey
   * @param userId The ID of the user submitting the survey
   * @param surveyData The survey data to submit
   */
  async submitSurvey(userId: string, surveyData: Omit<Survey, 'id' | 'userId' | 'completedAt'>): Promise<any> {
    try {
      const surveyId = uuidv4();
      const now = new Date().toISOString();
      
      const survey = {
        id: surveyId,
        userId,
        completedAt: now,
        ...surveyData
      };
      
      const result = await API.graphql(
        graphqlOperation(createSurveyMutation, { input: survey })
      );
      
      return result;
    } catch (error) {
      console.error('Error submitting survey:', error);
      throw error;
    }
  },
  
  /**
   * Get a survey by ID
   * @param id The ID of the survey to retrieve
   */
  async getSurveyById(id: string): Promise<Survey | null> {
    try {
      const result: any = await API.graphql(
        graphqlOperation(getSurveyByIdQuery, { id })
      );
      
      return result.data.getSurvey;
    } catch (error) {
      console.error('Error getting survey:', error);
      return null;
    }
  },
  
  /**
   * Get surveys by user ID
   * @param userId The ID of the user whose surveys to retrieve
   */
  async getSurveysByUserId(userId: string): Promise<any[]> {
    try {
      const result: any = await API.graphql(
        graphqlOperation(getSurveysByUserIdQuery, { userId })
      );
      
      return result.data.surveysByUser.items;
    } catch (error) {
      console.error('Error getting user surveys:', error);
      return [];
    }
  },
  
  /**
   * Get all surveys with pagination
   * @param limit The maximum number of surveys to retrieve
   * @param nextToken The pagination token
   */
  async getAllSurveys(limit = 100, nextToken?: string): Promise<any> {
    try {
      const result: any = await API.graphql(
        graphqlOperation(listSurveysQuery, { limit, nextToken })
      );
      
      return result.data.listSurveys;
    } catch (error) {
      console.error('Error listing surveys:', error);
      return { items: [], nextToken: null };
    }
  }
}; 
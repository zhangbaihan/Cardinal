import { SURVEY_ENDPOINTS, AUTH_ENDPOINTS, COGNITO_CONFIG } from './apiConfig';

/**
 * API service for interacting with the backend
 */

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();
  
  if (!response.ok) {
    const error = data?.message || response.statusText;
    throw new Error(error);
  }
  
  return data;
};

// Survey API functions
export const surveyApi = {
  // Submit a survey
  submitSurvey: async (surveyData, token) => {
    const response = await fetch(SURVEY_ENDPOINTS.SUBMIT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(surveyData)
    });
    
    return handleResponse(response);
  },
  
  // Get a user's survey
  getUserSurvey: async (token) => {
    const response = await fetch(SURVEY_ENDPOINTS.GET_USER_SURVEY, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return handleResponse(response);
  },
  
  // Get survey statistics
  getSurveyStats: async () => {
    const response = await fetch(SURVEY_ENDPOINTS.GET_STATS, {
      method: 'GET'
    });
    
    return handleResponse(response);
  }
};

// Auth API functions
export const authApi = {
  // Sign up a new user
  signup: async (userData) => {
    const response = await fetch(AUTH_ENDPOINTS.SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    return handleResponse(response);
  },
  
  // Log in a user
  login: async (credentials) => {
    try {
      // To be implemented using Cognito or your preferred auth provider
      console.log('Login with:', credentials);
      
      // Mock response for now
      return {
        token: 'mock-jwt-token',
        user: {
          id: 'mock-user-id',
          email: credentials.email,
          name: 'User'
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Log out a user
  logout: async () => {
    // To be implemented using Cognito or your preferred auth provider
    console.log('Logging out');
    
    // Mock response for now
    return true;
  }
}; 
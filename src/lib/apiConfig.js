/**
 * Configuration for API endpoints.
 * In development, these will point to localhost with SAM local.
 * In production, they will point to the deployed API Gateway URL.
 */

// Base API URL - Replace with your deployed API Gateway URL in production
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

// Survey endpoints
export const SURVEY_ENDPOINTS = {
  SUBMIT: `${API_BASE_URL}/survey`,
  GET_USER_SURVEY: `${API_BASE_URL}/survey/user`,
  GET_STATS: `${API_BASE_URL}/stats`,
};

// Cognito configuration
export const COGNITO_CONFIG = {
  REGION: process.env.NEXT_PUBLIC_COGNITO_REGION || 'us-east-1',
  USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
  CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
}; 
import { Amplify } from 'aws-amplify';
import { awsConfig } from '../config/aws-config';
import { authService } from './authService';
import { surveyService } from './surveyService';
import { analyticsService } from './analyticsService';

// Initialize Amplify with our configuration
Amplify.configure(awsConfig);

// Export all API services
export const API = {
  auth: authService,
  survey: surveyService,
  analytics: analyticsService
};

export default API; 